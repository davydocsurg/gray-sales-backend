import express from "express";
import multer from "multer";
import { StockController } from "../controllers";
import { catchAsync, stockImageStore, fileValidation } from "../helpers";
import { isAuthenticated } from "../middlewares";
import { ValidateCreateStockRequest } from "../middlewares/validators";

const stockRoutes = express.Router();

stockRoutes.get("/fetch", catchAsync(StockController.fetchStocks));

stockRoutes.post(
    "/create",
    isAuthenticated,
    multer({
        storage: stockImageStore,
        fileFilter: fileValidation,
    }).single("images"),
    catchAsync(StockController.createStock)
);

stockRoutes.get("/:stockId", catchAsync(StockController.fetchStock));
stockRoutes.put(
    "/:stockId/update",
    isAuthenticated,
    multer({
        storage: stockImageStore,
        fileFilter: fileValidation,
    }).single("images"),
    catchAsync(StockController.updateStock)
);
stockRoutes.delete(
    "/:stockId/delete",
    isAuthenticated,
    catchAsync(StockController.deleteStock)
);

export default stockRoutes;
