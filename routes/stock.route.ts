import express from "express";
import { StockController } from "../controllers";
import { catchAsync } from "../helpers";
import { ValidateCreateStockRequest } from "../middlewares/validators";

const stockRoutes = express.Router();

stockRoutes.get("/fetch", catchAsync(StockController.fetchStocks));

stockRoutes.post(
    "/create",
    ValidateCreateStockRequest,
    catchAsync(StockController.createStock)
);

stockRoutes.get("/:stockId", catchAsync(StockController.fetchStock));
stockRoutes.put("/:stockId/update", catchAsync(StockController.updateStock));
stockRoutes.delete("/:stockId/delete", catchAsync(StockController.deleteStock));

export default stockRoutes;
