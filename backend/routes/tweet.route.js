import express from 'express';
import { addCommentOrReply, createTweet, deleteComment, deleteTweet, GetAllTweet, getCommentByTweedId, getFollowingTweets, getRepliesByCommentId, likeOrDislike, likeOrDislikeComment } from '../controllers/tweet.contoller.js';
import { upload } from "../config/multer.middlewares.js";
import { jwtTokenAuthentication } from '../config/jwtAuthController.js';

const router = express.Router();

router.post("/create", jwtTokenAuthentication, upload.fields([
    { name: "tweetImages", maxCount: 10 }
]), createTweet);
router.delete("/delete/:tweetId", jwtTokenAuthentication, deleteTweet);
router.put("/likeordislike/:tweetId", jwtTokenAuthentication, likeOrDislike);
router.get("/getAllTweets", jwtTokenAuthentication, GetAllTweet);
router.get("/getFollowingTweets", jwtTokenAuthentication, getFollowingTweets);
router.post("/addComment/:tweetId", jwtTokenAuthentication, addCommentOrReply);
router.get("/getComments/:tweetId", jwtTokenAuthentication, getCommentByTweedId);
router.get("/getReplies/:commentId", jwtTokenAuthentication, getRepliesByCommentId);
router.delete("/deleteComment/:commentId", jwtTokenAuthentication, deleteComment);
router.get("/likeOrDislikeComment/:commentId", jwtTokenAuthentication, likeOrDislikeComment);

export default router;