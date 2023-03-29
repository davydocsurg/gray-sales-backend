import express from "express";
import AuthController from "../../controllers/v1/AuthController";
import { catchAsync } from "../../helpers";
import ValidateCreateUserRequest from "../../middlewares/validators/createUser";

const authRoutes = express.Router();

/**
 * @swagger
 * components:
 *  tags:
 *      name: Auth
 *      description: The auth managing API
 *      x-displayName: Auth
 *  /register:
 *    post:
 *      tags:
 *      - Auth
 *      summary: Register a new user
 *      description: Register a new user
 *      operationId: register
 *      requestBody:
 *         description: User object that needs to be added to the store
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *         description: User created successfully
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *      400:
 *         description: Invalid input
 */
authRoutes.post(
    "/register",
    ValidateCreateUserRequest,
    catchAsync(AuthController.createUser)
);

authRoutes.post("/login", catchAsync(AuthController.login));

export default authRoutes;
