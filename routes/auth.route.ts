import express from "express";
import AuthController from "../controllers/AuthController";
import { catchAsync } from "../helpers";
import ValidateCreateUserRequest from "../middlewares/validators/createUser";

const authRoutes = express.Router();

authRoutes.post(
    "/register",
    ValidateCreateUserRequest,
    catchAsync(AuthController.createUser)
);

export default authRoutes;
