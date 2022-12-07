import { Request } from "express";
import multer from "multer";
import fs from "fs";

// locals
import cloudinary from "cloudinary";
import Logging from "./customLog";

export const stockImageStore = multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
        // Logging.info(file);
        cb(null, "public/stocks/images");
    },

    filename: (req: Request, file: any, cb: Function) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

export const profileImageStore = multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
        Logging.info(file);
        cb(null, "public/users");
    },

    filename: (req: Request, file: any, cb: Function) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

export const fileValidation = (req: Request, file: any, cb: Function) => {
    if (file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const deleteOldPhoto = async (resource: any, oldPhoto: string) => {
    if (resource?.photo == oldPhoto) {
        return false;
    } else {
        return fs.unlinkSync(resource?.photo);
    }
};

export const uploadImage = async (images: string) => {
    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_STORAGE_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });

        let filesCount = 0;
        const uploads: cloudinary.UploadApiResponse[] = [];

        const result = await cloudinary.v2.uploader.upload(images, options);
        Logging.info(result);
    } catch (error) {
        Logging.error(error);
    }
};
