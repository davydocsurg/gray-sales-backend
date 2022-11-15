import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { checkUser, Logging } from "../helpers";
import User from "../models/User";
import { verifyUserLoginDetails } from "../helpers/user";

class AuthController {
    constructor() {
        this.createUser = this.createUser.bind(this);
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
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await verifyUserLoginDetails(
                email,
                password,
                res,
                next
            );
            jwt.sign({ user: user }, "secretKey", (err, token: any) => {
                return res.json({
                    success: true,
                    message: "Login successful",
                    data: {
                        user,
                        token: token,
                    },
                });
            });
        } catch (error) {
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
