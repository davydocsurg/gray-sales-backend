import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import { Category } from "../models";

class CategoryController {
    constructor() {
        this.createCategory = this.createCategory.bind(this);
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            let category = await Category.create({
                icon: req.body.icon,
                label: req.body.label,
                backgoundColor: req.body.backgoundColor,
                value: req.body.value,
            });
            res.status(200).json({
                success: true,
                results: 1,
                data: {
                    category,
                },
            });
        } catch (err) {
            Logging.error(err);
        }
    }
}

export default new CategoryController();
