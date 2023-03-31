import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import validate from "./validate";

const ValidateCreateUserRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return validate(
        [
            check("firstName")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Firstname is required"),
            check("lastName")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Lastname is required"),
            check("email")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Email is required"),
            check("password")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Password is required"),
        ],
        req,
        res,
        next
    );
};
export default ValidateCreateUserRequest;
