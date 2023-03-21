import { NextFunction, Response } from "express";
import { fetchUserStocks, Logging } from "../helpers";
import { Order } from "../models";
import type { AuthRequest, OrderType } from "../types";

class OrderController {
    constructor() {
        this.createOrder = this.createOrder.bind(this);
        this.fetchOrders = this.fetchOrders.bind(this);
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
    }

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

    async fetchOrders(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const orders = await Order.find({
                "user.userId": req.user._id,
            });

            return res.json({
                status: true,
                data: {
                    orders,
                },
                message: "Orders fetched successfully",
            });
        } catch (error: any) {
            return res.json({
                status: false,
                errors: {
                    error,
                },
            });
        }
    }

    async calculateTotalPrice(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        const stocks = await fetchUserStocks(req);
        let total = 0;
        await stocks.forEach((i: OrderType) => {
            total += i.quantity + i.stock.price;
        });
        // Logging.info(total.toFixed(2));

        return res.json({
            success: true,
            message: "Total price calculated",
            data: {
                total,
            },
        });
    }
}

export default new OrderController();
