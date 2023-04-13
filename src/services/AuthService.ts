import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cookieOptions, JWT_SECRET } from "../commons/constants";

import { AppError, checkUser } from "../helpers";
import { User } from "../models/v1";
import { AuthRequest } from "../types";

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
    const token = signToken(user._id, user.type);
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        success: true,
        token,
        user,
    });
};

class AuthService {
    constructor() {
        this.registerUser = this.registerUser.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async registerUser(req: Request, res: Response, next: NextFunction) {
        // try {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
            location,
        } = this.fetchRequest(req);

        const userExists = await checkUser(email, res, next);
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User Already Exist. Please Login",
            });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
            location,
            type: "vendor",
            verificationStatus: "unverfied",
            cart: { items: [] },
        });

        // createSendToken(user, 201, res);
        await user.save({ validateBeforeSave: false });
        return user;
        // } catch (error: unknown) {}
    }

    async login(req: AuthRequest, res: Response, next: NextFunction) {
        const { email, password } = this.fetchRequest(req);

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.checkPassword(password, user.password))) {
            let errors = {
                email: "Email or password is incorrect",
            };
            return next(new AppError("Incorrect credentials", 422, errors));
        }
        user.password = undefined;
        req.user = user;
        createSendToken(user, 200, res);
    }

    async logout(req: Request, res: Response, next: NextFunction) {}

    fetchRequest(req: Request) {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
            location,
        } = req.body;

        return {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
            location,
        };
    }
}

export default new AuthService();
