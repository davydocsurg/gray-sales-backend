import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import validate from "./validate";

const ValidateCreateExampleRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return validate(
        [
            check("title")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Title is required")
                .isLength({ min: 5 })
                .withMessage(
                    "Title must be equal to or greater than 5 characters"
                ),
            check("description")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Description is required")
                .isLength({ min: 10 })
                .withMessage(
                    "Description must be equal to or greater than 10 characters"
                ),
        ],
        req,
        res,
        next
    );
};
export default ValidateCreateExampleRequest;
