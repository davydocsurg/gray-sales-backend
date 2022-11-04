import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import { Stock } from "../models";

class StockController {
    constructor() {
        this.fetchStocks = this.fetchStocks.bind(this);
        this.createStock = this.createStock.bind(this);
    }

    async fetchStocks(req: Request, res: Response, next: NextFunction) {
        try {
            try {
                const stocksCount = await Stock.find().countDocuments();
                const stocks = await Stock.find();

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
        } catch (error) {}
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
}

export default new StockController();
