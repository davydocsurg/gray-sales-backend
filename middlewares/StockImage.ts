import multer from "multer";
import { fileStorage, fileValidation } from "../helpers";

export const stockImageUpload = () => {
    const uploadConfig = multer({
        storage: fileStorage,
        fileFilter: fileValidation,
    }).single("images");

    return uploadConfig;
};
