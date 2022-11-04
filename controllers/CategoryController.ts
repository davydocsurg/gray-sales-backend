import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import { Category } from "../models";

class CategoryController {
    constructor() {
        this.createCategory = this.createCategory.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    async fetchCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categoriesCount = await Category.find().countDocuments();
            const categories = await Category.find();

            if (!categoriesCount) {
                return res.json({
                    message: "No categories found",
                });
            }
            res.status(200).json({
                success: true,
                results: 1,
                data: {
                    categories,
                },
            });
        } catch (error: unknown) {
            return res.json({
                success: false,
                errors: {
                    error,
                },
            });
        }
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            let category = await Category.create({
                icon: req.body.icon,
                label: req.body.label,
                backgroundColor: req.body.backgroundColor,
                value: req.body.value,
            });
            res.status(200).json({
                success: true,
                results: 1,
                data: {
                    category,
                },
            });
        } catch (err: unknown) {
            Logging.error(err);
            return res.json({
                success: false,
                errors: {
                    err,
                },
            });
        }
    }
}

export default new CategoryController();
