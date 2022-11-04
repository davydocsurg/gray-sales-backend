import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Logging } from "../helpers";
import { Category } from "../models";

class CategoryController {
    constructor() {
        this.createCategory = this.createCategory.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchCategory = this.fetchCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
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
            return res.status(200).json({
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

    async fetchCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const catId = req.params.catId;

            const category = await Category.findById(catId);

            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    category,
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
            return res.status(200).json({
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

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        const catId = req.params.catId;
        const catIcon = req.body.icon;
        const catbgColor = req.body.backgroundColor;
        const catLabel = req.body.label;
        const catValue = req.body.value;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                errors: errors,
            });
        }

        try {
            const updatedData = {
                icon: catIcon,
                backgroundColor: catbgColor,
                label: catLabel,
                value: catValue,
            };

            const category = await Category.findByIdAndUpdate(
                catId,
                updatedData
            );

            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    category,
                },
            });
        } catch (error) {
            Logging.error(error);
            return res.json({
                success: false,
                errors: {
                    error,
                },
            });
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const catId = req.params.catId;
            const category = await Category.findByIdAndDelete(catId);
            return res.status(200).json({
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
