import { Request } from "express";
import multer from "multer";
import cloudinary from "cloudinary";

export const fileStorage = multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
        cb(null, "public/stocks/images");
    },

    filename: (req: Request, file: any, cb: Function) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

export const fileValidation = (req: Request, file: any, cb: Function) => {
    let fileMimetype = "image/png" || "image/jpg" || "image/jpeg";
    if (file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// export const uploadImage = () => {
//     const options = {
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//     };

//     cloudinary.v2.config({
//         cloud_name: process.env.CLOUD_STORAGE_NAME,
//         api_key: process.env.CLOUD_API_KEY,
//         api_secret: process.env.CLOUD_API_SECRET,
//     });

//     let filesCount = 0;
//     const uploads: cloudinary.UploadApiResponse[] = [];
// };
