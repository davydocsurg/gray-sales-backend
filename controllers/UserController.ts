import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import User from "../models/User";

class UserController {
    constructor() {
        this.getAuthUser = this.getAuthUser.bind(this);
    }

    async getAuthUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.find();

            return res.json({
                success: true,
                data: {
                    user,
                },
            });
        } catch (error) {
            Logging.error(error);
            return res.json({
                success: false,
                errors: {
                    error,
                },
            });
        }
    }
}

export default new UserController();
