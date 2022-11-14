import { NextFunction, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import Logging from "./customLog";

interface UserCredentials {
    email: undefined;
    res: Response;
    next: NextFunction;
}

export const checkUser = async (
    email: undefined,
    res: Response,
    next: NextFunction
) => {
    const user = await findUserByEmail(email);
    if (user) {
        return res.status(409).json({
            success: false,
            message: "User Already Exist. Please Login",
        });
    }

    return next();
};

export const verifyUserLoginDetails = async (
    email: undefined,
    password: string,
    res: Response,
    next: NextFunction
) => {
    const user = await findUserByEmail(email);

    if (!user) {
        return res.json({
            success: false,
            message: "User does not exist. Please Register",
        });
    }
    await validatePassword(user, password, res, next);
    // next();
    return user;
};

const validatePassword = async (
    user: any,
    password: string,
    res: Response,
    next: NextFunction
) => {
    const comparePwd = await bcrypt.compare(
        password?.trim(),
        user?.password.trim()
    );
    if (!comparePwd) {
        return res.json({
            success: false,
            message:
                "Email or password is not correct. Please check and try again",
        });
    }

    return next();
};

const findUserByEmail = async (email: undefined) => {
    const user = await User.findOne({ email: email });
    return user;
};
