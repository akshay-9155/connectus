import { User } from "../models/user.model.js";
import { Tweet } from "../models/tweet.model.js";

import mongoose from "mongoose";
import { generateToken } from "../config/jwtAuthController.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const Register = async (req, res) => {
    try {
        const { name, username, email, bio, password, profileImage, coverImage } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({ "message": "All feilds are required!", success: false });
        }
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            if (user.username === username) {
                return res.status(409).json({ "message": "Username not available!", success: false })
            } else {
                return res.status(409).json({ "message": "User already exist with the email", success: false })
            }
        }
        const newUser = new User();
        newUser.name = name;
        newUser.username = username;
        newUser.email = email;
        newUser.bio = bio;
        newUser.password = password;
        newUser.profileImage = profileImage;
        newUser.coverImage = coverImage;
        const savedUser = await newUser.save();

        // const newUser = User.create({
        //     name,
        //     username,
        //     email,
        //     password
        // })

        // res.status(200).json({"message": "Account created Successfully!", success: true});
        res.status(200).json({ "message": "User registered successfully!", savedUser: savedUser, success: true });
    } catch (error) {
        console.log("Can't Register", error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(409).json({ "message": "All fields required!", success: false });
        }
        const user = await User.findOne({ email }).populate("following", "name username profileImage followers").populate({ path: "bookmarks", populate: "author" });
        if (!user) {
            return res.status(404).json({ "message": "User not found", success: false });
        }
        if (!await user.comparePassword(password)) {
            return res.status(401).json({ "message": "Incorrect Password", success: false });
        }
        const payload = {
            id: user._id,
            email: user.email
        }
        const token = generateToken(payload);
        const options = {
            httpOnly: true,
            secure: true
        }
        res.status(200).cookie("token", token, options).json({ "message": "Logged In Successfully", user: user, "token": token, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const Logout = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("token", options).json({ "message": "Logged Out Successfully!", success: true });
}

export const Bookmark = async (req, res) => {
    try {
        const { tweetId } = req.params;
        const { id } = req.user;
        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(tweetId)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found!", success: false });
        }
        if (user.bookmarks.includes(tweetId)) {
            const updatedUser = await User.findByIdAndUpdate(id, { $pull: { "bookmarks": tweetId } }, { new: true }).populate("following", "name username profileImage followers").populate({ path: "bookmarks", populate: "author" });
            return res.status(200).json({ "message": "Bookmark removed", updatedUser: updatedUser, success: true })
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, { $push: { "bookmarks": tweetId } }, { new: true }).populate("following", "name username profileImage followers").populate({ path: "bookmarks", populate: "author" });
            return res.status(200).json({ "message": "Bookmark added", updatedUser: updatedUser, success: true })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const Profile = async (req, res) => {
    try {
        const { id } = req.user;
        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found!", success: false });
        }
        //   const {password, ...result} = user.toObject();    // removed password in response
        res.status(200).json({ "message": "User found", user: user, success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const GetOtherUsers = async (req, res) => {
    try {
        const { id } = req.user;
        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }
        const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
        res.status(200).json({ "message": "Found other users Successfully!", "users": otherUsers, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

// Earlier in Who to follow section all the users are visible even those who are already followed by the current user.
// Fixed this issue below. Above is the buggy version of code.

export const GetOtherUnfollowedUsers = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);
        if(!user.following) return [];
        const following = user.following;
        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }
        const otherUsers = await User.find({ _id: { $nin: [...following, id] } }).select("-password");
        res.status(200).json({ "message": "Found other users Successfully!", "users": otherUsers, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const Follow = async (req, res) => {
    try {
        const { userId } = req.params;
        const { id } = req.user;
        // Ensure that id and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }

        const { following } = await User.findById(id);
        if (following.includes(userId)) {
            const user = await User.findByIdAndUpdate(id, { $pull: { "following": userId } }, { new: true }).populate("following", "name username profileImage followers");
            const userToFollow = await User.findByIdAndUpdate(userId, { $pull: { "followers": id } }, { new: true }).populate("following", "name username profileImage followers");
            res.status(200).json({ "message": "Unfollowed!", "currentUser": user, "userToFollow": userToFollow, success: true });
        } else {
            const user = await User.findByIdAndUpdate(id, { $push: { "following": userId } }, { new: true }).populate("following", "name username profileImage followers");
            const userToFollow = await User.findByIdAndUpdate(userId, { $push: { "followers": id } }, { new: true }).populate("following", "name username profileImage followers");
            res.status(200).json({ "message": "Followed Successfully", "currentUser": user, "userToFollow": userToFollow, success: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
};

export const ToggleFollow = async (req, res) => {
    try {
        const { userId } = req.params;
        const { id } = req.user;

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
            console.log(`Invalid ID format. currentUserId: ${id}, targetUserId: ${userId}`);
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }

        const currentUser = await User.findById(id);
        const targetUser = await User.findById(userId);

        if (!currentUser || !targetUser) {
            console.log(`User not found. currentUserId: ${id}, targetUserId: ${userId}`);
            return res.status(404).json({ message: "User not found!", success: false });
        }

        let message;
        if (currentUser.following.includes(userId)) {
            // Unfollow logic
            currentUser.following = currentUser.following.filter(followingId => followingId.toString() !== userId.toString());
            targetUser.followers = targetUser.followers.filter(followerId => followerId.toString() !== id.toString());
            message = "Unfollowed Successfully";
        } else {
            // Follow logic
            currentUser.following.push(userId);
            targetUser.followers.push(id);
            message = "Followed Successfully";
        }

        // Save the updates to the database
        await currentUser.save();
        await targetUser.save();

        // Populate the updated currentUser and targetUser
        const populatedCurrentUser = await User.findById(id).populate("following", "name username profileImage followers");
        const populatedTargetUser = await User.findById(userId).populate("following", "name username profileImage followers");

        res.status(200).json({
            message,
            currentUser: populatedCurrentUser,
            targetUser: populatedTargetUser,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// const currentUser = await User.findByIdAndUpdate(id, { $pull: { "following": userId } }, { new: true }).populate("following", "name username profileImage followers");
// const userToFollow = await User.findByIdAndUpdate(userId, { $pull: { "followers": id } }, { new: true }).populate("following", "name username profileImage followers");

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ "message": "Invalid ID format", success: false });
        }
        const userProfile = await User.findById(userId).select("-password");
        if (!userProfile) {
            return res.status(404).json({ "message": "User not found!", success: false });
        }
        return res.status(200).json({ "message": "User found!", "userProfile": userProfile, success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.user;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }

        const { name, bio } = req.body;

        // Optional validation (for name, bio, etc.)
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            return res.status(400).json({ message: "Invalid name provided", success: false });
        }

        let updatedFields = { name, bio };

        // Check if new profile image is provided
        if (req?.files?.profileImage) {
            const profileImageLocalPath = req.files.profileImage[0].path;
            const url = await uploadToCloudinary(profileImageLocalPath, "profileImage");
            updatedFields.profileImage = url || "";
        }

        // Check if new cover image is provided
        if (req?.files?.coverImage) {
            const coverImageLocalPath = req.files.coverImage[0].path;
            const url = await uploadToCloudinary(coverImageLocalPath, "coverImage");
            updatedFields.coverImage = url || "";
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: updatedFields
            },
            { new: true, runValidators: true } // runValidators ensures that schema validations are enforced
        ).select("-password"); // Exclude the password from the returned user data

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            message: "User Updated Successfully",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


export const DeleteUser = async (req, res) => {
    try {
        const { id } = req.user;

        // Check for valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format", success: false });
        }

        // Find the user by ID
        const user = await User.findById(id);

        // If user not found
        if (!user) {
            return res.status(404).json({ message: "User not found!", success: false });
        }

        // Remove the user, which will trigger the pre('remove') middleware
        await user.removeMiddleware();
        await user.deleteOne({_id : id});

        // Respond with success message
        return res.status(200).json({
            message: "Account gone, memories remain",
            success: true,
            deletedUser: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
