import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { promisify } from "util";
import { JWT_SECRET } from "../commons/constants";
import { AppError, catchAsync } from "../helpers";
import { User } from "../models";

const jwt_key: string = JWT_SECRET;
const isAuthenticated = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // const logInSession: boolean = await req?.session.isLoggedIn;

        // if (!logInSession) {
        //     return res.redirect("/login");
        // }
        // return next();

        let token;
        // check if token is set
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(
                new AppError("Unauthorized. Please login to continue.", 401)
            );
        }

        // verify token
        const payload: any = await promisify(jwt.verify)(token, jwt_key);

        // check if user still exists in the database
        const currentUser = await User.findById(payload.id);
        if (!currentUser) {
            return next(new AppError("This User does not exist", 401));
        }

        // check if user's password is still thesame since token issue
        const passwordChanged = await currentUser.changedPasswordAfter(
            payload.iat
        );
        if (passwordChanged) {
            return next(
                new AppError(
                    "User recently changed password. Please, login again",
                    401
                )
            );
        }

        // grant access
        req.user = currentUser;
        return next();
    }
);
export default isAuthenticated;
