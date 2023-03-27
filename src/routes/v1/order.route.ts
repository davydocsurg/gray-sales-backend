import express from "express";
import { OrderController } from "../../controllers/v1";
import { catchAsync } from "../../helpers";
import { isAuthenticated } from "../../middlewares";

const orderRoutes = express.Router();

orderRoutes.get(
    "/fetch",
    isAuthenticated,
    catchAsync(OrderController.fetchOrders)
);

orderRoutes.post(
    "/create",
    isAuthenticated,
    catchAsync(OrderController.createOrder)
);

orderRoutes.get(
    "/checkout",
    isAuthenticated,
    catchAsync(OrderController.checkout)
);

export default orderRoutes;
