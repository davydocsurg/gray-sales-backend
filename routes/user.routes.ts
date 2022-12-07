import express from "express";
import multer from "multer";
import { UserController } from "../controllers";
import { catchAsync, fileValidation, profileImageStore } from "../helpers";
import { isAuthenticated } from "../middlewares";

const userRoutes = express.Router();

userRoutes.get(
    "/auth-user",
    isAuthenticated,
    catchAsync(UserController.getAuthUser)
);

userRoutes.get(
    "/stock-owner/:id",
    isAuthenticated,
    catchAsync(UserController.findUserById)
);

userRoutes.put(
    "/auth-user/:id/update-profile",
    isAuthenticated,
    multer({
        storage: profileImageStore,
        fileFilter: fileValidation,
    }).single("photo"),
    catchAsync(UserController.updateProfile)
);

export default userRoutes;
