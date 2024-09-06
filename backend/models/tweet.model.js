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

commentSchema.methods.removeReplies = async function () {
    try {
        // Recursively remove all replies (and their replies) associated with this comment
        for (let replyId of this.replies) {
            let reply = await this.model('Comment').findById(replyId);
            if (reply) {
                await reply.removeReplies(); // Recursive call to remove nested replies
                await reply.deleteOne(); // Remove the reply itself
            }
        }

        // Clear the replies array of the current comment
        

    } catch (err) {
        console.error('Error removing nested replies:', err);
        throw err; // Re-throw error to handle it in the calling function if needed
    }
};

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

tweetSchema.methods.removeComments = async function () {
    try {
        // Delete all comments associated with this tweet
        await this.model('Comment').deleteMany({ _id: { $in: this.comments } });
        
    } catch (err) {
        console.log(err);
    }
};

// Models
export const Comment = mongoose.model("Comment", commentSchema);
export const Tweet = mongoose.model("Tweet", tweetSchema);
