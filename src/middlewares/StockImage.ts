import multer from "multer";
import { fileValidation } from "../helpers";

export const stockImageUpload = () => {
    const uploadConfig = multer({
        // storage:,
        fileFilter: fileValidation,
    }).single("images");

    return uploadConfig;
};
