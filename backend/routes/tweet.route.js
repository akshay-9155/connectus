import express from 'express';
import { addCommentOrReply, createTweet, deleteComment, deleteTweet, GetAllTweet, getCommentByTweedId, getFollowingTweets, getRepliesByCommentId, likeOrDislike, likeOrDislikeComment } from '../controllers/tweet.contoller.js';
import { upload } from "../config/multer.middlewares.js";
import { jwtTokenAuthentication } from '../config/jwtAuthController.js';

const router = express.Router();

router.post("/create", upload.fields([
    { name: "tweetImages", maxCount: 10 }
]), createTweet);
router.delete("/delete/:tweetId", deleteTweet);
router.put("/likeordislike/:tweetId", likeOrDislike);
router.get("/getAllTweets", GetAllTweet);
router.get("/getFollowingTweets", getFollowingTweets);
router.post("/addComment/:tweetId", addCommentOrReply);
router.get("/getComments/:tweetId", getCommentByTweedId);
router.get("/getReplies/:commentId", getRepliesByCommentId);
router.delete("/deleteComment/:commentId", deleteComment);
router.get("/likeOrDislikeComment/:commentId", likeOrDislikeComment);

export default router;