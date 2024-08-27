import express from "express";
import { Bookmark, Follow, getUserProfile, GetOtherUsers, Login, Logout, Profile, Register, GetOtherUnfollowedUsers, ToggleFollow, DeleteUser, updateUserProfile } from "../controllers/user.controller.js";
import { jwtTokenAuthentication } from "../config/jwtAuthController.js";
import { upload } from "../config/multer.middlewares.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.put("/bookmark/:tweetId", jwtTokenAuthentication, Bookmark);
router.get("/profile", jwtTokenAuthentication, Profile);
router.get("/getOtherUsers", jwtTokenAuthentication, GetOtherUsers);
router.put("/toggleFollow/:userId", jwtTokenAuthentication, ToggleFollow);
router.get("/getUserProfile/:userId", jwtTokenAuthentication, getUserProfile);
router.get("/getOtherUnfollowedUsers", jwtTokenAuthentication, GetOtherUnfollowedUsers);
router.delete("/deleteAccount", jwtTokenAuthentication, DeleteUser);

// Route for updating the user profile, with file upload support
router.put(
    "/updateUser",
    jwtTokenAuthentication,
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    updateUserProfile
);

export default router;
