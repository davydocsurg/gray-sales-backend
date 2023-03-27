import { NextFunction, Request, Response } from "express";
import { Stock } from "../models";
import { AuthRequest } from "../types";

class StockService {
    constructor() {
        this.fetchStocks = this.fetchStocks.bind(this);
        this.createStock = this.createStock.bind(this);
        this.fetchStock = this.fetchStock.bind(this);
        this.updateStock = this.updateStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
        this.fetchUserStocks = this.fetchUserStocks.bind(this);
    }

    async fetchStocks(res: Response) {
        const stocksCount = this.countStocks();
        const stocks = (await Stock.find()).reverse();

        if (!stocksCount) {
            return res.json({
                message: "No stocks found",
            });
        }

        return stocks;
    }

    async countStocks() {
        const stocksCount = await Stock.find().countDocuments();

        return stocksCount;
    }

    async fetchUserStocks(res: Response) {}

    async createStock(req: AuthRequest) {
        const {
            title,
            description,
            price,
            categoryId,
            type,
            location,
            pickUpTimes,
            listFor,
            quantity,
        } = req.body;
        const images = req.files;

        const stock = await Stock.create({
            title,
            description,
            price,
            images,
            categoryId,
            type,
            location,
            pickUpTimes,
            listFor,
            quantity,
            user: req?.user,
        });

        return stock;
    }

    async fetchStock(req: AuthRequest, res: Response, next: NextFunction) {}

    async updateStock(req: AuthRequest, res: Response, next: NextFunction) {}

    async deleteStock(req: AuthRequest, res: Response, next: NextFunction) {}
}

export default new StockService();
