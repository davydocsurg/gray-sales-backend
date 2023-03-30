import express from "express";
import { CartController } from "../../controllers/v1";
import { catchAsync } from "../../helpers";
import { isAuthenticated } from "../../middlewares";

const cartRoute = express.Router();

/**
 * @swagger
 * components:
 * tags:
 *  name: Cart
 *  description: The cart managing API
 *  x-displayName: Cart
 * /carts/add:
 *  post:
 *  tags:
 *  - Cart
 *  summary: Add stock to cart
 *  description: Add stock to cart
 *  operationId: addStockToCart
 *  requestBody:
 *  description: Stock object that needs to be added to the cart
 */
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
