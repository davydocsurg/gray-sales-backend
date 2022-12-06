import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { checkUser, Logging } from "../helpers";
import User from "../models/User";
import { verifyUserLoginDetails } from "../helpers/user";
import { cookieOptions, JWT_SECRET } from "../commons/constants";

const signToken = (id: string, type: string) => {
    const jwt_key: string = JWT_SECRET;
    const token = jwt.sign({ id, type }, jwt_key, { expiresIn: "1d" });
    return token;
};

const createSendToken = (
    user: any,
    statusCode: number = 200,
    res: Response
) => {
    const token = signToken(user.id, user.type);
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        success: true,
        token,
        user,
    });
};

class AuthController {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.login = this.login.bind(this);
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            const userExists = await checkUser(email, res, next);
            if (userExists) {
                return res.status(409).json({
                    success: false,
                    message: "User Already Exist. Please Login",
                });
            }
            const hashedPwd = await bcrypt.hash(password, 12);

            const user = await User.create({
                name: name,
                email: email,
                password: hashedPwd,
            });

            return res.status(200).json({
                success: true,
                results: 1,
                data: { user },
            });
        } catch (error) {
            Logging.error(error);
            return res.json({
                success: false,
                errors: { error },
            });
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
            const user = await verifyUserLoginDetails(
                email,
                password,
                res,
                next
            );

            if (user === null) {
                return res.json({
                    success: false,
                    message: "User does not exist. Please Register",
                });
            }
            user.password = undefined;
            req.user = user;
            createSendToken(user, 200, res);

            // jwt.sign(
            //     { user: user },
            //     "secretKey",
            //     (err: unknown, token: unknown) => {
            //         if (err) {
            //             return Logging.error(err);
            //         }
            //         return res.json({
            //             success: true,
            //             message: "Login successful",
            //             data: {
            //                 user,
            //                 token: token,
            //             },
            //         });
            //     }
            // );
        } catch (error: unknown) {
            Logging.error(error);
            return res.json({
                errors: {
                    error,
                },
            });
        }
    }
}

export default new AuthController();
