import express from "express";
import { CartController } from "../controllers";
import { catchAsync } from "../helpers";
import { isAuthenticated } from "../middlewares";

const cartRoute = express.Router();

cartRoute.post(
    "/add",
    isAuthenticated,
    catchAsync(CartController.addProdToCart)
);

cartRoute.get("/fetch", isAuthenticated, catchAsync(CartController.fetchCart));

cartRoute.delete(
    "/delete",
    isAuthenticated,
    catchAsync(CartController.deleteProdFromCart)
);

export default cartRoute;
