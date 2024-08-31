import express from 'express';
import { addCommentOrReply, createTweet, deleteTweet, GetAllTweet, getCommentByTweedId, getFollowingTweets, getRepliesByCommentId, likeOrDislike } from '../controllers/tweet.contoller.js';
import { upload } from "../config/multer.middlewares.js";

const router = express.Router();

router.post("/create", upload.fields([
    { name: "tweetImages", maxCount: 10 }
]), createTweet);
router.delete("/delete/:tweetId", deleteTweet);
router.put("/likeordislike/:tweetId", likeOrDislike);
router.get("/getAllTweets", GetAllTweet);
router.get("/getFollowingTweets", getFollowingTweets);
router.post("/addCommentOrReply/:tweetId", addCommentOrReply);
router.get("/getCommentByTweedId", getCommentByTweedId);
router.get("/getRepliesByCommentId", getRepliesByCommentId);

export default router;