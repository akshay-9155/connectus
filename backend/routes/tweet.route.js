import express from 'express';
import { createTweet, deleteTweet, GetAllTweet, getFollowingTweets, likeOrDislike } from '../controllers/tweet.contoller.js';
import { upload } from "../config/multer.middlewares.js";

const router = express.Router();

router.post("/create", upload.fields([
    { name: "tweetImages", maxCount: 10 }
]), createTweet);
router.delete("/delete/:tweetId", deleteTweet);
router.put("/likeordislike/:tweetId", likeOrDislike);
router.get("/getAllTweets", GetAllTweet);
router.get("/getFollowingTweets", getFollowingTweets);

export default router;