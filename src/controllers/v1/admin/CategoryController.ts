import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Logging } from "../../../helpers";
import { Category } from "../../../models/v1";
import { CategoryService } from "../../../services";

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
            const categories = await CategoryService.fetchCategories(res);

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
            const category = await CategoryService.fetchCategory(req, res);

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
            const category = await CategoryService.createCategory(req);
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
        try {
            const category = await CategoryService.updateCategory(req, res);

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
            const category = await CategoryService.deleteCategory(req, res);

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
