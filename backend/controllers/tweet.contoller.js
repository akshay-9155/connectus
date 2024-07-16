import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const createTweet = async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.user;
        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }
        const newTweet = new Tweet();
        newTweet.description = description;
        newTweet.author = id;
        const savedTweet = await newTweet.save();
        const user = await User.findByIdAndUpdate(
            id,
            { $push: { tweets: savedTweet._id } },
            { new: true }
        );

        res.status(200).json({ "message": "Tweet created Successfully", tweet: savedTweet, user: user, success: true });
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
        const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
        if (!deletedTweet) {
            return res.status(404).json({ "message": "Tweet not found!", success: false });
        }
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
        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(tweetId)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({ message: "Tweet not found!", success: false });
        }
        if (tweet.likes.includes(id)) {
            const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, { $pull: { "likes": id } }, { new: true });
            return res.status(200).json({ message: "Disliked!", success: true, tweet: updatedTweet });
        } else {
            const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, { $push: { "likes": id } }, { new: true });
            return res.status(200).json({ message: "Liked!", success: true, tweet: updatedTweet });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const GetAllTweet = async (req, res) => {
    try {
        const { id } = req.user;
        const loggedInUser = await User.findById(id).lean();

        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const allTweets = await Tweet.find({
            $or: [
                { "author": id },
                { "author": { $in: loggedInUser.following } }
            ]
        }).lean();

        res.status(200).json({ message: "All tweets found Successfully", Tweets: allTweets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
};


export const getFollowingTweets =  async (req, res) => {
    try {
        const {id} = req.user;
        const loggedInUser = await User.findById(id).lean();
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if(!loggedInUser.following.length){
            return res.status(404).json({ message: "User not following anyone!" });
        }
        const followingTweets = await Tweet.find({ "author": { $in: loggedInUser.following } }).lean();
        res.status(200).json({ message: "Following tweets found Successfully", followingTweets: followingTweets});

    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}