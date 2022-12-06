import express from "express";
import { StockController } from "../controllers";
import { catchAsync } from "../helpers";
import { isAuthenticated } from "../middlewares";
import { ValidateCreateStockRequest } from "../middlewares/validators";

const stockRoutes = express.Router();

stockRoutes.get("/fetch", catchAsync(StockController.fetchStocks));

stockRoutes.post(
    "/create",
    isAuthenticated,
    catchAsync(StockController.createStock)
);

stockRoutes.get("/:stockId", catchAsync(StockController.fetchStock));
stockRoutes.put(
    "/:stockId/update",
    isAuthenticated,
    catchAsync(StockController.updateStock)
);
stockRoutes.delete(
    "/:stockId/delete",
    isAuthenticated,
    catchAsync(StockController.deleteStock)
);

export default stockRoutes;
