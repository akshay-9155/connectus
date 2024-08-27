import {v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("Cloudinary configured successfully");
} catch (error) {
    console.error("Error configuring Cloudinary:", error);
}


const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        fs.unlinkSync(localFilePath);
        console.log("File uploaded succesfully", response);
        return response;
    } catch (error) {
        console.error(error);
        fs.unlinkSync(localFilePath)    // Remove the locally saved temporary file as the upload operation got failed.
        return null;
    }
}

export {uploadToCloudinary};