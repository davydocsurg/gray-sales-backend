import express from "express";
import AuthController from "../../controllers/v1/AuthController";
import { catchAsync } from "../../helpers";
import ValidateCreateUserRequest from "../../middlewares/validators/createUser";

const authRoutes = express.Router();

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Get all users
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: OK
 */
authRoutes.post(
    "/register",
    ValidateCreateUserRequest,
    catchAsync(AuthController.createUser)
);

authRoutes.post("/login", catchAsync(AuthController.login));

export default authRoutes;
