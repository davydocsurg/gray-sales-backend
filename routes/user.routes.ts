import express from "express";
import { UserController } from "../controllers";
import { catchAsync } from "../helpers";

const userRoutes = express.Router();

userRoutes.get("/auth-user", catchAsync(UserController.getAuthUser));

export default userRoutes;
