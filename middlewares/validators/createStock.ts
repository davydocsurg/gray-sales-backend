import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import validate from "./validate";
import { Category, Stock } from "../../models";

const ValidateCreateStockRequest = (
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
                .custom(async (value) => {
                    const title = await Stock.findOne({
                        where: { name: value },
                    });
                    if (title) {
                        return Promise.reject("Title already taken");
                    }
                }),
            check("description")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Description is required"),
            check("price")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Price is required"),
            check("images")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Minimum of one image is required"),

            check("categoryId")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Category is required"),
        ],
        req,
        res,
        next
    );
};
export default ValidateCreateStockRequest;
