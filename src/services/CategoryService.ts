import { NextFunction, Request, Response } from "express";
import { Category } from "../models/v1";

class CategoryService {
    constructor() {
        this.fetchCategories = this.fetchCategories.bind(this);
        this.createCategory = this.createCategory.bind(this);
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

    fetchRequestData(req: Request) {
        const { icon, label, backgroundColor, value } = req.body;

        return {
            icon,
            label,
            backgroundColor,
            value,
        };
    }
}

export default new CategoryService();
