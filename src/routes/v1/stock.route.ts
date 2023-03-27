import express from "express";
import multer from "multer";
import { StockController } from "../../controllers/v1";
import { catchAsync, stockImageStore, fileValidation } from "../../helpers";
import { isAuthenticated } from "../../middlewares";
import { ValidateCreateStockRequest } from "../../middlewares/validators";

const stockRoutes = express.Router();

stockRoutes.get("/fetch", catchAsync(StockController.fetchStocks));

// ValidateCreateStockRequest,
stockRoutes.post(
    "/create",
    [
        isAuthenticated,
        multer({
            storage: stockImageStore,
            fileFilter: fileValidation,
        }).array("images"),
    ],
    catchAsync(StockController.createStock)
);

stockRoutes.get("/user/:userId", catchAsync(StockController.fetchUserStocks));
stockRoutes.get("/:stockId", catchAsync(StockController.fetchStock));
stockRoutes.put(
    "/:stockId/update",
    isAuthenticated,
    multer({
        storage: stockImageStore,
        fileFilter: fileValidation,
    }).array("images"),
    catchAsync(StockController.updateStock)
);
stockRoutes.delete(
    "/:stockId/delete",
    isAuthenticated,
    catchAsync(StockController.deleteStock)
);

stockRoutes.get(
    "/category/:categoryId",
    isAuthenticated,
    catchAsync(StockController.fetchStocksByCategory)
);

export default stockRoutes;
