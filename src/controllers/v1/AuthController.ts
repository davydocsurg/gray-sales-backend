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
        await AuthService.registerUser(req, res, next);
    }

    async login(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await AuthService.login(req, res, next);
        } catch (error: unknown) {
            Logging.error(error);
            return res.json({
                success: false,
                errors: { error },
            });
        }
    }
}

export default new AuthController();
