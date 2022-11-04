import express from "express";
import { StockController } from "../controllers";
import { catchAsync } from "../helpers";
import { ValidateCreateStockRequest } from "../middlewares/validators";

const stockRoutes = express.Router();

stockRoutes.post(
    "/create",
    ValidateCreateStockRequest,
    catchAsync(StockController.createStock)
);

// stockRoutes.get("/fetch", catchAsync(CategoryController.fetchCategories));
// stockRoutes.get("/:catId", catchAsync(CategoryController.fetchCategory));
// stockRoutes.put(
//     "/:catId/update",
//     catchAsync(CategoryController.updateCategory)
// );
// stockRoutes.delete(
//     "/:catId/delete",
//     catchAsync(CategoryController.deleteCategory)
// );

export default stockRoutes;
