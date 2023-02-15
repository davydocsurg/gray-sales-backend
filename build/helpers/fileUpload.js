"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.deleteOldPhoto = exports.fileValidation = exports.profileImageStore = exports.stockImageStore = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// locals
const cloudinary_1 = __importDefault(require("cloudinary"));
const customLog_1 = __importDefault(require("./customLog"));
exports.stockImageStore = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Logging.info(file);
        cb(null, "public/stocks/images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});
exports.profileImageStore = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/users");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});
const fileValidation = (req, file, cb) => {
    if (file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.fileValidation = fileValidation;
const deleteOldPhoto = (oldPhoto, defaultPhoto) => __awaiter(void 0, void 0, void 0, function* () {
    if (oldPhoto == defaultPhoto) {
        return false;
    }
    else {
        return fs_1.default.unlinkSync(oldPhoto);
    }
});
exports.deleteOldPhoto = deleteOldPhoto;
const uploadImage = (images) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };
        cloudinary_1.default.v2.config({
            cloud_name: process.env.CLOUD_STORAGE_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });
        let filesCount = 0;
        const uploads = [];
        const result = yield cloudinary_1.default.v2.uploader.upload(images, options);
        customLog_1.default.info(result);
    }
    catch (error) {
        customLog_1.default.error(error);
    }
});
exports.uploadImage = uploadImage;
