import { NextFunction, Request, Response } from "express";

import { Logging } from "../../helpers";
import { AuthRequest } from "../../types";
import { AuthService } from "../../services";

class AuthController {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.login = this.login.bind(this);
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            await AuthService.registerUser(req, res, next);

            return res.status(200).json({
                success: true,
                message: "Registration successful",
                data: null,
            });
        } catch (error) {
            Logging.error(error);
            return res.json({
                success: false,
                errors: { error },
            });
        }
    }

    async login(req: AuthRequest, res: Response, next: NextFunction) {
        await AuthService.login(req, res, next);
    }
}

export default new AuthController();
