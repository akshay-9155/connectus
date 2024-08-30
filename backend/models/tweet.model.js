import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    replyText: {
        type: String,
        required: true
    },
    replyLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }]
},{timestamps: true})

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
    replies: {
        type: [replySchema]
    }
},{timestamps: true})

const tweetSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    comments: {
        type: [commentSchema]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const Tweet = mongoose.model("Tweet",tweetSchema);