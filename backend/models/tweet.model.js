import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment" // Reference to the same schema
    }]
}, { timestamps: true });

const tweetSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

// Models
export const Comment = mongoose.model("Comment", commentSchema);
export const Tweet = mongoose.model("Tweet", tweetSchema);
