import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        default: "Describe yourself here!"
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg&ga=GA1.1.773177594.1724988335&semt=ais_hybrid"
    },
    coverImage: {
        type: String,
        default: "https://img.freepik.com/free-vector/blank-user-circles_78370-4336.jpg?size=626&ext=jpg&ga=GA1.1.773177594.1724988335&semt=ais_hybrid"
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    tweets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet"
    },
    bookmarks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet"
    }
},{timestamps: true})

userSchema.pre("save", async function (next){
    try {
        const person = this;
        if(!person.isModified("password")) return next();
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function(userPassword){
    try {
        const person = this;
        return await bcrypt.compare(userPassword, person.password);  
    } catch (error) {
        return false;
    }
}



export const User = mongoose.model("User", userSchema);