import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Logging } from "../helpers";
import { Stock } from "../models";

class StockController {
    constructor() {
        this.fetchStocks = this.fetchStocks.bind(this);
        this.createStock = this.createStock.bind(this);
    }

    async fetchStocks(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                errors: errors,
            });
        }
        try {
            const stocksCount = await Stock.find().countDocuments();
            const stocks = (await Stock.find()).reverse();

            if (!stocksCount) {
                return res.json({
                    message: "No stocks found",
                });
            }
            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    stocks,
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

    async createStock(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.body.title;
            const description = req.body.description;
            const price = req.body.price;
            const images = req.file;
            const categoryId = req.body.categoryId;

            const imageUrl = images?.path;
            const stock = await Stock.create({
                title,
                description,
                price,
                images: imageUrl,
                categoryId,
            });
            // Logging.info(stock);

            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    stock,
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

    async fetchStock(req: Request, res: Response, next: NextFunction) {
        try {
            const stockId = req.params.stockId;

            const stock = await Stock.findById(stockId);

            if (stock === null) {
                return res.json({
                    success: false,
                    message: "Stock does not exist",
                });
            }

            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    stock,
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

    async updateStock(req: Request, res: Response, next: NextFunction) {
        const stockId = req.params.stockId;
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const images = req.body.images;
        const categoryId = req.body.categoryId;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                errors: errors,
            });
        }

        try {
            const updatedData = {
                title: title,
                description: description,
                price: price,
                images: images,
                categoryId: categoryId,
            };

            const stock = await Stock.findByIdAndUpdate(stockId, updatedData);

            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    stock,
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

    async deleteStock(req: Request, res: Response, next: NextFunction) {
        try {
            const stockId = req.params.stockId;
            const stock = await Stock.findByIdAndDelete(stockId);

            return res.status(200).json({
                success: true,
                results: 1,
                message: "Stock deleted successfully!",
                data: {
                    stock,
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

export default new StockController();
