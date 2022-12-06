import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import { Stock } from "../models";
import User from "../models/User";

class UserController {
    constructor() {
        this.getAuthUser = this.getAuthUser.bind(this);
        this.findUserById = this.findUserById.bind(this);
    }

    async getAuthUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const authUserStocks = await Stock.find({
                user: req.user,
            });

            return res.json({
                success: true,
                data: {
                    user,
                    authUserStocks,
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

    async findUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const user = await User.findById(id);

            return res.json({
                success: true,
                data: {
                    user,
                },
            });
        } catch (error: unknown) {
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
