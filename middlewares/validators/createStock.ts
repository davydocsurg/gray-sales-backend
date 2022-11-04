import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import validate from "./validate";
import { Stock } from "../../models";

const ValidateCreateCategoryRequest = (
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
                .custom(async (value) => {
                    const title = await Stock.findOne({
                        where: { title: value },
                    });
                    if (title) {
                        return Promise.reject("Title already taken");
                    }
                })
                .withMessage("Title is required"),
            check("description")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Description is required"),
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
