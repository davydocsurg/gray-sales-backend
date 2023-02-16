import { NextFunction, Response } from "express";
import bcrypt from "bcryptjs";

import { User } from "../models";
import { AppError } from ".";

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
        return true;
    }

    return false;
};

export const verifyUserLoginDetails = async (
    email: undefined,
    password: string,
    res: Response,
    next: NextFunction
) => {
    // const user = await findUserByEmail(email);
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
        let errors = {
            email: "Email or password is incorrect",
        };
        return next(new AppError("Incorrect credentials", 422, errors));
    }
    // await validatePassword(user, password, res, next);

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
        let errors =
            "Email or password is not correct. Please check and try again";
        return next(new AppError("Incorrect credentials", 422, errors));
    }

    // return next();
};

const findUserByEmail = async (email: undefined) => {
    const user = await User.findOne({ email: email });
    return user;
};
