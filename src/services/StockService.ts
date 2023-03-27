import { NextFunction, Request, Response } from "express";
import { DEFAULT_STOCK_PHOTO } from "../commons/constants";
import { deleteOldPhoto } from "../helpers";
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

    async fetchUserStocks(req: Request) {
        const userId = req.params.userId;
        const userStocksCount = await Stock.find({
            user: userId,
        }).countDocuments();

        return userStocksCount;
    }

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
            images,
        } = this.fetchRequestBody(req);

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

    async fetchStock(req: Request, res: Response) {
        const stockId = req.params.stockId;

        const stock = await Stock.findById(stockId);
        if (stock === null) {
            return res.json({
                success: false,
                message: "Stock does not exist",
            });
        }

        return stock;
    }

    async updateStock(req: AuthRequest) {
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
            images,
        } = this.fetchRequestBody(req);
        const stockId = req.params.stockId;

        const updatedData = {
            title,
            description,
            price,
            images,
            categoryId,
            type,
            location,
            pickUpTimes,
            quantity,
            listFor,
        };

        const stock = await Stock.findById(stockId);

        const updatedStock = await Stock.findByIdAndUpdate(
            stockId,
            updatedData
        );

        const oldPhoto = stock?.images[0].path;

        await deleteOldPhoto(oldPhoto, DEFAULT_STOCK_PHOTO);

        return updatedStock;
    }

    async deleteStock(req: AuthRequest, res: Response, next: NextFunction) {}

    fetchRequestBody(req: AuthRequest) {
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

        return {
            title,
            description,
            price,
            categoryId,
            type,
            location,
            pickUpTimes,
            listFor,
            quantity,
            images,
        };
    }
}

export default new StockService();
