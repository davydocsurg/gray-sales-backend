"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const constants_1 = require("../commons/constants");
// locals
const helpers_1 = require("../helpers");
const models_1 = require("../models");
class StockController {
    constructor() {
        this.fetchStocks = this.fetchStocks.bind(this);
        this.createStock = this.createStock.bind(this);
    }
    fetchStocks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json({
                    errors: errors,
                });
            }
            try {
                const stocksCount = yield models_1.Stock.find().countDocuments();
                const stocks = (yield models_1.Stock.find()).reverse();
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
                        stocksCount,
                    },
                });
            }
            catch (error) {
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
    fetchUserStocks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const userStocksCount = yield models_1.Stock.find({
                    user: userId,
                }).countDocuments();
                return res.json({
                    success: true,
                    data: { userStocksCount },
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    createStock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const title = req.body.title;
                const description = req.body.description;
                const price = req.body.price;
                const images = req.file;
                const categoryId = req.body.categoryId;
                const stock = yield models_1.Stock.create({
                    title,
                    description,
                    price,
                    images,
                    categoryId,
                    user: req === null || req === void 0 ? void 0 : req.user,
                });
                return res.status(200).json({
                    success: true,
                    results: 1,
                    data: {
                        stock,
                    },
                });
            }
            catch (err) {
                helpers_1.Logging.error(err);
                return res.json({
                    success: false,
                    errors: {
                        err,
                    },
                });
            }
        });
    }
    fetchStock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockId = req.params.stockId;
                const stock = yield models_1.Stock.findById(stockId);
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
            }
            catch (error) {
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
    updateStock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const stockId = req.params.stockId;
            const title = req.body.title;
            const description = req.body.description;
            const price = req.body.price;
            const images = req.file;
            const categoryId = req.body.categoryId;
            const errors = (0, express_validator_1.validationResult)(req);
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
                const stock = yield models_1.Stock.findById(stockId);
                const updatedStock = yield models_1.Stock.findByIdAndUpdate(stockId, updatedData);
                const oldPhoto = stock === null || stock === void 0 ? void 0 : stock.images[0].path;
                yield (0, helpers_1.deleteOldPhoto)(oldPhoto, constants_1.DEFAULT_STOCK_PHOTO);
                return res.status(200).json({
                    success: true,
                    results: 1,
                    data: {
                        updatedStock,
                    },
                });
            }
            catch (error) {
                helpers_1.Logging.error(error);
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
    deleteStock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stockId = req.params.stockId;
                const prevStock = yield models_1.Stock.findById(stockId);
                const photo = prevStock === null || prevStock === void 0 ? void 0 : prevStock.images[0].path;
                yield (0, helpers_1.deleteOldPhoto)(photo, constants_1.DEFAULT_STOCK_PHOTO);
                yield models_1.Stock.findByIdAndDelete(stockId);
                return res.status(200).json({
                    success: true,
                    results: 1,
                    message: "Stock deleted successfully!",
                });
            }
            catch (err) {
                helpers_1.Logging.error(err);
                return res.json({
                    success: false,
                    errors: {
                        err,
                    },
                });
            }
        });
    }
}
exports.default = new StockController();
