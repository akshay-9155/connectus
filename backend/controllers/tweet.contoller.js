import { Comment, Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createTweet = async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.user;

        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }

        if (!description) {
            return res.status(400).json({ "message": "Tweet cannot be empty", success: false });
        }

        let imageResults = [];
        if (req.files && req.files.tweetImages) {
            const { tweetImages } = req.files;
            // If images are provided, upload them to Cloudinary
            const uploadPromises = tweetImages.map(tweetImage => uploadToCloudinary(tweetImage.path));
            imageResults = await Promise.all(uploadPromises);

            if (!imageResults) {
                return res.status(500).json({ "message": "Failed to upload images. Please retry...", success: false });
            }
        }

        // Create a new tweet with or without images
        const newTweet = new Tweet({
            description,
            author: id,
            images: imageResults
        });

        const savedTweet = await newTweet.save();
        const user = await User.findByIdAndUpdate(
            id,
            { $push: { tweets: savedTweet._id } },
            { new: true }
        );

        res.status(200).json({ "message": "Tweet created successfully", tweet: savedTweet, user: user, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const { tweetId } = req.params;
        const { id } = req.user;
        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(tweetId)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({ "message": "Tweet not found!", success: false });
        }
        tweet.removeComments();
        const deletedTweet = await tweet.deleteOne({_id : tweetId});
        await User.findByIdAndUpdate(id, { $pull: { tweets: tweetId, bookmarks: tweetId } });        // Remove deleted tweet from User's data
        return res.status(200).json({ "message": "Tweet deleted successfully!", "deletedTweet": deletedTweet, success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const likeOrDislike = async (req, res) => {
    try {
        const { tweetId } = req.params;
        const { id } = req.user;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(tweetId)) {
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }

        // Check if tweet exists
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({ message: "Tweet not found!", success: false });
        }

        // Toggle like/dislike
        const updateOperation = tweet.likes.includes(id)
            ? { $pull: { likes: id } }
            : { $push: { likes: id } };

        const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, updateOperation, { new: true });

        const message = tweet.likes.includes(id) ? "Disliked!" : "Liked!";
        res.status(200).json({ message, success: true, tweet: updatedTweet });
    } catch (error) {
        console.error('Error liking/disliking tweet:', error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const GetAllTweet = async (req, res) => {
    try {
        const { id } = req.user;
        const loggedInUser = await User.findById(id).lean();

        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const allTweets = await Tweet.find({
            $or: [
                { author: id },
                { author: { $in: loggedInUser.following } }
            ]
        })
            .populate('author', '-password -bio') // Populate author excluding password and bio
            .populate({
                path: 'comments',
                populate: [
                    {
                        path: 'author',
                        select: 'username'
                    },
                    {
                        path: 'replies',
                        populate: [
                            {
                                path: 'author',
                                select: 'username'
                            },
                            {
                                path: 'replies',
                                populate: [
                                    {
                                        path: 'author',
                                        select: 'username'
                                    },
                                    {
                                        path: 'replies',
                                        populate: [
                                            {
                                                path: 'author',
                                                select: 'username'
                                            },
                                            {
                                                path: 'replies'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({ message: "All tweets found Successfully", Tweets: allTweets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



export const getFollowingTweets =  async (req, res) => {
    try {
        console.log(req.user);
        const {id} = req.user;
        const loggedInUser = await User.findById(id).lean();
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if(!loggedInUser.following.length){
            return res.status(200).json({ message: "User not following anyone!", followingTweets: [] });
        }
        const followingTweets = await Tweet.find({ "author": { $in: loggedInUser.following } }).populate('author', '-password, -bio').sort({ createdAt: -1 }).lean();
        res.status(200).json({ message: "Following tweets found Successfully", followingTweets: followingTweets});

    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}


export const addCommentOrReply = async (req, res) => {
    const { tweetId } = req.params;
    const { commentId, content, type } = req.body;
    const { id } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(tweetId)) {
        return res.status(400).json({ message: "Invalid ID format", success: false });
    }

    try {
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({ message: "Tweet not found" });
        }

        const responseData = {};

        if (type === "comment") {
            
            const newComment = new Comment;
            newComment.author = id;
            newComment.content = content;

            responseData.savedComment = await newComment.save();
            tweet.comments.push(responseData.savedComment._id);

        } else if (type === "reply") {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            const newReply = new Comment;
            newReply.author = id;
            newReply.content = content;
            
            responseData.savedReply = await newReply.save();
            comment.replies.push(responseData.savedReply._id);
            responseData.savedComment = await comment.save();

        } else {
            return res.status(400).json({ message: "Invalid type specified" });
        }

        responseData.tweet = await tweet.save();
        res.status(201).json({ message: "Successfully added", responseData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCommentByTweedId =  async (req, res) => {
    try {
        const { tweetId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(tweetId)) {
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }
        const tweet = await Tweet.findById(tweetId).populate({
            path: "comments",
            populate: {
                path: "author",
                select: "username"
            }
        }).exec();
        if (!tweet) return res.status(404).json({"message": "Tweet not found."});
        return res.status(200).json({"message": "Comments found", tweet});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error?.response?.message || "Internal Server error" });
    }
}

export const getRepliesByCommentId =  async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }
        const comment = await Comment.findById(commentId).populate({
            path: "replies",
            populate: {
                path: "author",
                select: "username"
            }
        }).exec();
        if (!comment) return res.status(404).json({ "message": "Comment not found." });
        return res.status(200).json({ "message": "Comments found", comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error?.response?.message || "Internal Server error" });
    } 
}

export const deleteComment =  async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }
        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ "message": "Comment not found." });
        comment.removeReplies();
        await Comment.updateMany({replies:commentId},{$pull: {replies: commentId}});
        const deletedComment = await comment.deleteOne({_id:commentId});
        if (!deleteComment) return res.status(500).json({ "message": "Can't delete Comment. Something went wrong!" });
        return res.status(200).json({"message": "Comment deleted successfully!", deletedComment});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error?.response?.message || "Internal Server error" });
    }
}

export const likeOrDislikeComment =  async (req, res) => {
    try {
        const {commentId} = req.params;
        const { id } = req.user;
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }
        const comment = await Comment.findById(commentId);
        if(!comment) return res.status(404).json({"message": "Comment not found!"});
        const updateOperation = comment.likes.includes(id)
            ? { $pull: { likes: id } }
            : { $push: { likes: id } };
        const updatedComment = await Comment.findByIdAndUpdate(commentId,updateOperation,{new: true});
        const message = comment.likes.includes(id) ? "Disliked!" : "Liked!";
        return res.status(200).json({message,updatedComment,success:true});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error?.response?.message || "Internal Server error" });
    }
}