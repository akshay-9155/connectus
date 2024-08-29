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


const uploadToCloudinary = async (localFilePath, image) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        const url = await cloudinary.url(response?.public_id, {
            transformation: [
                {
                    fetch_format: 'auto',
                },
                {
                    quality: 'auto'
                },
                {
                    width: image == "profileImage" ? 400 : 900,
                    height: image == "profileImage" ? 400 : 300,
                    crop: 'fill',
                    gravity: 'auto'
                }
            ]
        })
        fs.unlinkSync(localFilePath);
        if(!url) return null        
        return url;
    } catch (error) {
        console.error(error);
        fs.unlinkSync(localFilePath)    // Remove the locally saved temporary file as the upload operation got failed.
        return null;
    }
}

export {uploadToCloudinary};