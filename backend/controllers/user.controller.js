import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { generateToken } from "../config/jwtAuthController.js";

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
        const user = await User.findOne({ email }).populate("following","name username profileImage followers");
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
            const updatedUser = await User.findByIdAndUpdate(id, { $pull: { "bookmarks": tweetId } }, { new: true })
            return res.status(200).json({ "message": "Bookmark removed", success: true })
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, { $push: { "bookmarks": tweetId } }, { new: true })
            return res.status(200).json({ "message": "Bookmark added", success: true })
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

// export const GetOtherUsers = async (req, res) => {
//     try {
//         const { id } = req.user;
//         // Ensure that id and userId are valid ObjectIds
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ "message": "Invalid ID format", success: false });
//         }
//         const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
//         res.status(200).json({ "message": "Found other users Successfully!", "users": otherUsers, success: true });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ "message": "Internal Server Error", success: false });
//     }
// }

// Earlier in Who to follow section all the users are visible even those who are already followed by the current user.
// Fixed this issue below. Above is the buggy version of code.

export const GetOtherUsers = async (req, res) => {
    try {
        const { id } = req.user;
        const { following } = await User.findById(id);
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
            const user = await User.findByIdAndUpdate(id, { $pull: { "following": userId } }, { new: true });
            const userToFollow = await User.findByIdAndUpdate(userId, { $pull: { "followers": id } }, { new: true });
            res.status(200).json({ "message": "Unfollowed!", "currentUser": user, "userToFollow": userToFollow, success: true });
        } else {
            const user = await User.findByIdAndUpdate(id, { $push: { "following": userId } }, { new: true });
            const userToFollow = await User.findByIdAndUpdate(userId, { $push: { "followers": id } }, { new: true });
            res.status(200).json({ "message": "Followed Successfully", "currentUser": user, "userToFollow": userToFollow, success: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error", success: false });
    }
};

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

