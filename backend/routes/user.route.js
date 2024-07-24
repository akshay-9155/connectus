import express from "express";
import { Bookmark, Follow, getUserProfile, GetOtherUsers, Login, Logout, Profile, Register, GetOtherUnfollowedUsers, ToggleFollow } from "../controllers/user.controller.js";
import { jwtTokenAuthentication } from "../config/jwtAuthController.js";
const router = express.Router();
router.post("/register", Register);
router.post("/login",Login);
router.get("/logout",Logout);
router.put("/bookmark/:tweetId", jwtTokenAuthentication , Bookmark);
router.get("/profile", jwtTokenAuthentication, Profile);
router.get("/getOtherUsers", jwtTokenAuthentication, GetOtherUsers);
// router.put("/follow/:userId", jwtTokenAuthentication, Follow);
router.put("/toggleFollow/:userId", jwtTokenAuthentication, ToggleFollow);
router.get("/getUserProfile/:userId", jwtTokenAuthentication, getUserProfile);
router.get("/getOtherUnfollowedUsers", jwtTokenAuthentication, GetOtherUnfollowedUsers);

export default router;