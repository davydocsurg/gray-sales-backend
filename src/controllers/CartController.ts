import { NextFunction, Request, Response } from "express";
import { Logging } from "../helpers";
import { Stock } from "../models";
import { AuthRequest } from "../types";

class CartController {
    constructor() {
        this.addStockToCart = this.addStockToCart.bind(this);
        this.fetchCart = this.fetchCart.bind(this);
        this.deleteStockFromCart = this.deleteStockFromCart.bind(this);
        this.reduceStockQty = this.reduceStockQty.bind(this);
    }

    async addStockToCart(req: AuthRequest, res: Response, next: NextFunction) {
        const stockId = req.body.stockId.trim();

        const stock = await Stock.findById(stockId);
        if (!stock) {
            return res.json({
                success: false,
                message: "Stock not found",
            });
        }
        await req.user.addToCart(stock);

        return res.json({
            success: true,
            message: "Stock added to cart",
            data: {
                stock,
            },
        });
    }

    async fetchCart(req: AuthRequest, res: Response, next: NextFunction) {
        const stockInCart = await req.user.populate("cart.items");

        const stocks = stockInCart.cart.items;

        return res.json({
            success: true,
            message: "Cart fetched",
            data: {
                stocks,
            },
        });
    }

    async deleteStockFromCart(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        const stockId = req.body.stockId.trim();

        await req.user.removeFromCart(stockId);

        return res.json({
            success: true,
            message: "Stock removed from cart",
        });
    }

    async reduceStockQty(req: AuthRequest, res: Response, next: NextFunction) {
        const stockId = req.body.stockId.trim();

        await req.user.reduceStockQty(stockId);

        return res.json({
            success: true,
            message: "Stock quantity reduced",
        });
    }
}

export default new CartController();
