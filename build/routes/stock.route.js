"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const stockRoutes = express_1.default.Router();
stockRoutes.get("/fetch", (0, helpers_1.catchAsync)(controllers_1.StockController.fetchStocks));
stockRoutes.post("/create", middlewares_1.isAuthenticated, (0, multer_1.default)({
    storage: helpers_1.stockImageStore,
    fileFilter: helpers_1.fileValidation,
}).single("images"), (0, helpers_1.catchAsync)(controllers_1.StockController.createStock));
stockRoutes.get("/user/:userId", (0, helpers_1.catchAsync)(controllers_1.StockController.fetchUserStocks));
stockRoutes.get("/:stockId", (0, helpers_1.catchAsync)(controllers_1.StockController.fetchStock));
stockRoutes.put("/:stockId/update", middlewares_1.isAuthenticated, (0, multer_1.default)({
    storage: helpers_1.stockImageStore,
    fileFilter: helpers_1.fileValidation,
}).single("images"), (0, helpers_1.catchAsync)(controllers_1.StockController.updateStock));
stockRoutes.delete("/:stockId/delete", middlewares_1.isAuthenticated, (0, helpers_1.catchAsync)(controllers_1.StockController.deleteStock));
exports.default = stockRoutes;
