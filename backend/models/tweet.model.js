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

commentSchema.pre('remove', async function (next) {
    try {
        // Delete all replies associated with this comment
        await this.model('Comment').deleteMany({ _id: { $in: this.replies } });
        next();
    } catch (err) {
        next(err);
    }
});

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

tweetSchema.pre('remove', async function (next) {
    try {
        // Delete all comments associated with this tweet
        await this.model('Comment').deleteMany({ _id: { $in: this.comments } });
        next();
    } catch (err) {
        next(err);
    }
});

// Models
export const Comment = mongoose.model("Comment", commentSchema);
export const Tweet = mongoose.model("Tweet", tweetSchema);
