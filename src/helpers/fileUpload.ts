import { Request } from "express";
import multer from "multer";
import fs from "fs";

// locals
import Logging from "./customLog";
import { AppError } from "./AppError";
import cloudinary from "../config/cloudinary";
import { DEFAULT_STOCK_PHOTO } from "../commons/constants";
import { Photo } from "../types";

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
    if (+req.files.length > 4) {
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

const stockFileOptions = {
    folder: "stocks",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: "image",
};

export const uploadImage = {
    upload: async (file: string) => {
        const result = await cloudinary.uploader.upload(file, stockFileOptions);
        // Logging.success(result);
        return {
            id: result.public_id,
            title: result.original_filename,
            // description: result.context?.custom?.description,
            url: result.secure_url,
        };
    },

    delete: async (file: string) => {
        const result = await cloudinary.uploader.destroy(file);
        return result;
    },
};

export const uploadStockImages = (images: Express.Multer.File[]) => {
    return Promise.all(
        images.map(async (image: Express.Multer.File) => {
            return await uploadImage.upload(image.path);
        })
    );
};

export const deleteStockImages = (images: Photo[]) => {
    return Promise.all(
        images.map(async (image) => {
            return await uploadImage.delete(image.id);
        })
    );
};

export const deleteLocalImages = async (images: Express.Multer.File[]) => {
    await Promise.all(
        (images as Express.Multer.File[]).map((image: Express.Multer.File) => {
            deleteOldPhoto(image.path, DEFAULT_STOCK_PHOTO);
        })
    );
};
