"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const userRoutes = express_1.default.Router();
userRoutes.get("/auth-user", middlewares_1.isAuthenticated, (0, helpers_1.catchAsync)(controllers_1.UserController.getAuthUser));
userRoutes.get("/stock-owner/:id", middlewares_1.isAuthenticated, (0, helpers_1.catchAsync)(controllers_1.UserController.findUserById));
userRoutes.put("/auth-user/update-profile/:id", middlewares_1.isAuthenticated, (0, multer_1.default)({
    storage: helpers_1.profileImageStore,
    fileFilter: helpers_1.fileValidation,
}).single("photo"), (0, helpers_1.catchAsync)(controllers_1.UserController.updateProfile));
exports.default = userRoutes;
