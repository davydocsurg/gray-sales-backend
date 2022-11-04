import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import { Stock } from "../models";

class StockController {
    constructor() {
        this.createStock = this.createStock.bind(this);
    }

    async createStock(req: Request, res: Response, next: NextFunction) {
        try {
            const stock = await Stock.create({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                images: req.body.images,
                categoryId: req.body.categoryId,
            });

            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    stock,
                },
            });
        } catch (err) {
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

export default new StockController();
