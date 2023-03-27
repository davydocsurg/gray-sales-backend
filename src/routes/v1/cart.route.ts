import express from "express";
import { CartController } from "../../controllers/v1";
import { catchAsync } from "../../helpers";
import { isAuthenticated } from "../../middlewares";

const cartRoute = express.Router();

cartRoute.post(
    "/add",
    isAuthenticated,
    catchAsync(CartController.addStockToCart)
);

cartRoute.get("/fetch", isAuthenticated, catchAsync(CartController.fetchCart));

cartRoute.patch(
    "/reduce-quantity",
    isAuthenticated,
    catchAsync(CartController.reduceStockQty)
);

cartRoute.delete(
    "/delete",
    isAuthenticated,
    catchAsync(CartController.deleteStockFromCart)
);

export default cartRoute;
