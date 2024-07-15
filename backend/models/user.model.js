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
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    following: {
        type: [],
        required: true
    },
    followers: {
        type: [],
        required: true
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
        resizeBy.status(500).send("Internal Server Error")
    }
})

userSchema.methods.comparePassword = async function(userPassword){
    try {
        const person = this;
        return bcrypt.compare(userPassword, person.password);  
    } catch (error) {
        res.status(500).send("Internal Server Error!");
    }
}



export const User = mongoose.model("User", userSchema);