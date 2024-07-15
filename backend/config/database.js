import mongoose from "mongoose";
const databaseConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection FAILED:", error);
        process.exit(1);
    }
}

export default databaseConnection;