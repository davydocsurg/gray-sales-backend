import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { DEFAULT_STOCK_PHOTO } from "../../commons/constants";

// locals
import { deleteOldPhoto, Logging, uploadImage } from "../../helpers";
import { Stock } from "../../models/v1";
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

    async fetchStocks(req: AuthRequest, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                errors: errors,
            });
        }
        try {
            const stocksCount = await StockService.countStocks();
            const stocks = await StockService.fetchNearByStocks(req, res);

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
            const userStocksCount = await StockService.fetchUserStocks(req);

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
            const stock = await StockService.fetchStock(req, res);

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

    async updateStock(req: AuthRequest, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                errors: errors,
            });
        }

        try {
            const updatedStock = await StockService.updateStock(req, res);

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

    async deleteStock(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await StockService.deleteStock(req);

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
            const categoryStocks = await StockService.fetchStocksByCategory(
                req
            );

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
