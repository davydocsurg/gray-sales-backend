import { Request } from "express";
import multer from "multer";
import fs from "fs";

// locals
import cloudinary from "cloudinary";
import Logging from "./customLog";
import { AppError } from "./AppError";

export const stockImageStore = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, "public/stocks/images");
    },

    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

export const profileImageStore = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, "public/users");
    },

    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

export const fileValidation = (
    req: Request,
    file: Express.Multer.File,
    cb: Function
) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (req.files.length > 4) {
        const error = new AppError(
            "You can only upload a maximum of 4 images",
            400
        );
        return cb(error, false);
    } else if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(
            new AppError("Only .png, .jpg and .jpeg format allowed!", 400),
            false
        );
    }
    cb(null, true);
};

export const deleteOldPhoto = async (
    oldPhoto: string,
    defaultPhoto: string
) => {
    if (oldPhoto == defaultPhoto) {
        return false;
    } else {
        return fs.unlinkSync(oldPhoto);
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
