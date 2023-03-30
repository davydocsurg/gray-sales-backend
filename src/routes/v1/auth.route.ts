import express from "express";
import AuthController from "../../controllers/v1/AuthController";
import { catchAsync } from "../../helpers";
import ValidateCreateUserRequest from "../../middlewares/validators/createUser";

const authRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 */
authRoutes.post(
    "/register",
    ValidateCreateUserRequest,
    catchAsync(AuthController.createUser)
);

authRoutes.post("/login", catchAsync(AuthController.login));

export default authRoutes;
