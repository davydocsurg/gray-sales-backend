import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import User from "../models/User";

class AuthController {
    constructor() {
        this.createUser = this.createUser.bind(this);
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            const oldUser = await User.findOne({ email });

            if (oldUser) {
                return res.status(409).json({
                    success: false,
                    message: "User Already Exist. Please Login",
                });
            }

            const user = await User.create({
                name: name,
                email: email,
                password: password,
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
}

export default new AuthController();
