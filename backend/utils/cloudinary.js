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


const checkForDuplicateImage = async (phash) => {
    try {
        const result = await cloudinary.search
            .expression(`phash=${phash}`)
            .execute();
        return result.total_count > 0 ? result.resources[0].secure_url : null;
    } catch (error) {
        console.error("Error checking for duplicate image:", error);
        return null;
    }
};

const uploadToCloudinary = async (localFilePath, image) => {
    try {
        if (!localFilePath) return null;

        // First, upload the image to get its phash
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            phash: true, // Request the perceptual hash
        });

        // Check if an image with the same phash already exists
        const existingImageUrl = await checkForDuplicateImage(response.phash);
        if (existingImageUrl) {
            fs.unlinkSync(localFilePath);
            console.log('Duplicate image found, returning existing image URL.');
            return existingImageUrl;
        }

        // Proceed with transformations and return the final URL
        const url = await cloudinary.url(response.public_id, {
            transformation: [
                { fetch_format: 'auto' },
                { quality: 'auto' },
                {
                    width: image === "profileImage" ? 400 : 900,
                    height: image === "profileImage" ? 400 : 300,
                    crop: 'fill',
                    gravity: 'auto',
                },
            ],
        });

        fs.unlinkSync(localFilePath);
        return url;
    } catch (error) {
        console.error(error);
        fs.unlinkSync(localFilePath);
        return null;
    }
};


export {uploadToCloudinary};