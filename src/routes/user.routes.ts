import express from "express";
import multer from "multer";
import { UserController } from "../controllers/v1";
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
    "/auth-user/update-profile/:id",
    isAuthenticated,
    multer({
        storage: profileImageStore,
        fileFilter: fileValidation,
    }).single("photo"),
    catchAsync(UserController.updateProfile)
);

export default userRoutes;
