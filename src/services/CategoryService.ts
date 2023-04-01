import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Category } from "../models/v1";

class CategoryService {
    constructor() {
        this.fetchCategories = this.fetchCategories.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    async fetchCategories(res: Response) {
        const categoriesCount = await Category.find().countDocuments();
        const categories = await Category.find();

        if (!categoriesCount) {
            return res.json({
                message: "No categories found",
            });
        }

        return categories;
    }

    async createCategory(req: Request) {
        const { icon, label, backgroundColor, value } =
            this.fetchRequestData(req);

        const category = await Category.create({
            icon,
            label,
            backgroundColor,
            value,
        });

        return category;
    }

    async updateCategory(req: Request, res: Response) {
        const { catId } = this.fetchRequestParams(req);
        const { icon, label, backgroundColor, value } =
            this.fetchRequestData(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const updatedData = {
            icon,
            backgroundColor,
            label,
            value,
        };

        const category = await Category.findByIdAndUpdate(catId, updatedData);

        return category;
    }

    async deleteCategory(req: Request, res: Response) {
        const { catId } = this.fetchRequestParams(req);
        const category = await Category.findById(catId);

        if (!category) {
            return res.status(404).json({
                message: "Category does not exist",
            });
        }
        return true;
    }

    fetchRequestData(req: Request) {
        const { icon, label, backgroundColor, value } = req.body;

        return {
            icon,
            label,
            backgroundColor,
            value,
        };
    }

    fetchRequestParams(req: Request) {
        const { catId } = req.params;

        return {
            catId,
        };
    }
}

export default new CategoryService();
