import { NextFunction, Response } from "express";
import { Order } from "../models";
import type { AuthRequest, OrderType } from "../types";

class OrderController {
    constructor() {}

    async createOrder(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const orders = await req.user.populate("cart");

            const stocks = orders.cart.items.map((i: OrderType) => {
                return { quantity: i.quantity, stock: { ...i.stock } };
            });

            const order = new Order({
                user: {
                    userId: req.user._id,
                    email: req.user.email,
                },
                stocks,
            });
            await order.save();
            req.user.clearCart();

            return res.json({
                success: true,
                message: "Order created!",
                data: {
                    order,
                },
            });
        } catch (error: any) {
            return res.json({
                success: false,
                errors: {
                    error,
                },
            });
        }
    }
}

export default new OrderController();
