"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockImageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const helpers_1 = require("../helpers");
const stockImageUpload = () => {
    const uploadConfig = (0, multer_1.default)({
        storage: helpers_1.fileStorage,
        fileFilter: helpers_1.fileValidation,
    }).single("images");
    return uploadConfig;
};
exports.stockImageUpload = stockImageUpload;
