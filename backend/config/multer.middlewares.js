import multer from "multer";

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Save temporary files in public/temp
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Preserve the original filename
    }
});

// Export the upload configuration
export const upload = multer({
    storage,
});
