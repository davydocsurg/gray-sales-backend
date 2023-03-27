import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { DEFAULT_STOCK_PHOTO } from "../../commons/constants";

// locals
import { deleteOldPhoto, Logging } from "../../helpers";
import { Stock } from "../../models";
import { StockService } from "../../services";
import { AuthRequest } from "../../types";

class StockController {
    constructor() {
        this.fetchStocks = this.fetchStocks.bind(this);
        this.createStock = this.createStock.bind(this);
        this.fetchStock = this.fetchStock.bind(this);
        this.updateStock = this.updateStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
        this.fetchUserStocks = this.fetchUserStocks.bind(this);
    }

    async fetchStocks(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                errors: errors,
            });
        }
        try {
            const stocksCount = await StockService.countStocks();
            const stocks = await StockService.fetchStocks(res);
            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    stocks,
                    stocksCount,
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

    async fetchUserStocks(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const userStocksCount = await Stock.find({
                user: userId,
            }).countDocuments();

            return res.json({
                success: true,
                data: { userStocksCount },
            });
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async createStock(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const stock = await StockService.createStock(req);

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
        const images = req.file;
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

            const stock = await Stock.findById(stockId);

            const updatedStock = await Stock.findByIdAndUpdate(
                stockId,
                updatedData
            );

            const oldPhoto = stock?.images[0].path;

            await deleteOldPhoto(oldPhoto, DEFAULT_STOCK_PHOTO);

            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    updatedStock,
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
            const prevStock = await Stock.findById(stockId);

            const photo = prevStock?.images[0].path;
            await deleteOldPhoto(photo, DEFAULT_STOCK_PHOTO);
            await Stock.findByIdAndDelete(stockId);

            return res.status(200).json({
                success: true,
                results: 1,
                message: "Stock deleted successfully!",
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

    async fetchStocksByCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const categoryId = req.params.categoryId;

            // find all stocks by category
            const categoryStocks = await Stock.find({
                categoryId,
            });
            Logging.info(categoryStocks);

            return res.status(200).json({
                success: true,
                results: 1,
                data: {
                    categoryStocks,
                },
            });
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async fetchStocksByUser(req: Request, res: Response, next: NextFunction) {
        try {
            // const userStocks;
        } catch (error: unknown) {}
    }
}

export default new StockController();
