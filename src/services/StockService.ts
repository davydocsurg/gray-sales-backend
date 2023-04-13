import { NextFunction, Request, Response } from "express";
import { DEFAULT_STOCK_PHOTO } from "../commons/constants";
import {
    calculateDistance,
    deleteLocalImages,
    deleteOldPhoto,
    deleteStockImages,
    Logging,
    uploadImage,
    uploadStockImages,
} from "../helpers";
import { Stock } from "../models/v1";
import { AuthRequest, StockType } from "../types";

class StockService {
    constructor() {
        this.fetchStocks = this.fetchStocks.bind(this);
        this.createStock = this.createStock.bind(this);
        this.fetchStock = this.fetchStock.bind(this);
        this.updateStock = this.updateStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
        this.fetchUserStocks = this.fetchUserStocks.bind(this);
        this.fetchStocksByCategory = this.fetchRequestParams.bind(this);
    }

    async fetchNearByStocks(req: AuthRequest, res: Response) {
        const userLat = req.user.location.coordinates[1];
        const userLong = req.user.location.coordinates[0];

        const stocksCount = this.countStocks();
        if (!stocksCount) {
            return res.json({
                message: "No stocks found",
            });
        }

        // fetch stocks with locations closer to the auth user's location
        const stocks: StockType[] = await Stock.find();

        const nearByStocks = stocks
            .map((stock: StockType) => {
                const stockLat = stock.pickupLocation.coordinates[1];
                const stockLong = stock.pickupLocation.coordinates[0];

                const distance = calculateDistance(
                    userLat,
                    userLong,
                    stockLat,
                    stockLong
                );
                return {
                    ...stock.toObject(),
                    distance,
                };
            })
            .filter(
                (value: any, index: number, array: any[]) => value.distance < 10
            );

        return nearByStocks;
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

        const uploadImages = await uploadStockImages(
            images as Express.Multer.File[]
        );
        await deleteLocalImages(images as Express.Multer.File[]);

        const stock = await Stock.create({
            title,
            description,
            price,
            images: uploadImages,
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
        const { stockId } = this.fetchRequestParams(req);

        const stock = await Stock.findById(stockId);
        if (stock === null) {
            return res.json({
                success: false,
                message: "Stock does not exist",
            });
        }

        return stock;
    }

    async updateStock(req: AuthRequest, res: Response) {
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
        const { stockId } = this.fetchRequestParams(req);

        const stock = await Stock.findById(stockId);

        if (!stock) {
            return res.json({
                success: false,
                message: "Stock does not exist",
            });
        }

        const updatedData = {
            title,
            description,
            price,
            categoryId,
            type,
            location,
            pickUpTimes,
            quantity,
            listFor,
        };

        const updatedStock = await Stock.findByIdAndUpdate(
            stockId,
            updatedData
        );

        if (images) {
            const uploadedImages = await uploadStockImages(
                images as Express.Multer.File[]
            );

            const updatedStock = await Stock.findByIdAndUpdate(
                stockId,
                {
                    images: uploadedImages,
                },
                { new: true }
            );
            const oldPhoto = stock.images;

            await deleteStockImages(oldPhoto);
            await deleteLocalImages(images as Express.Multer.File[]);
            return updatedStock;
        }

        return updatedStock;
    }

    async deleteStock(req: AuthRequest) {
        const { stockId } = this.fetchRequestParams(req);
        const prevStock = await Stock.findById(stockId);

        const photos = prevStock?.images;
        await deleteStockImages(photos);
        await Stock.findByIdAndDelete(stockId);

        return true;
    }

    async fetchStocksByCategory(req: Request) {
        const { categoryId } = this.fetchRequestParams(req);
        const categoryStocks = await Stock.find({
            categoryId,
        });

        return categoryStocks;
    }

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

    fetchRequestParams(req: Request) {
        const { stockId, categoryId } = req.params;

        return { stockId, categoryId };
    }
}

export default new StockService();
