import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import validate from "./validate";

const ValidateCreateCategoryRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return validate(
        [
            check("icon")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Icon is required"),
            check("label")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Label is required"),
            check("backgroundColor")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Background color is required"),
            check("value")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Value is required"),
        ],
        req,
        res,
        next
    );
};
export default ValidateCreateCategoryRequest;
