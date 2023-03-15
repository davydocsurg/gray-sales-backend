import { NextFunction, Request, Response } from "express";
import { Stock } from "../models";
import { AuthRequest } from "../types";

class CartController {
    constructor() {
        this.addProdToCart = this.addProdToCart.bind(this);
        this.fetchCart = this.fetchCart.bind(this);
    }

    async addProdToCart(req: AuthRequest, res: Response, next: NextFunction) {
        const stockId = req.body.productId.trim();

        const product = await Stock.findById(stockId);
        if (!product) {
            return res.json({
                success: false,
                message: "Product not found",
            });
        }
        await req.user.addToCart(product);

        return res.json({
            success: true,
            message: "Product added to cart",
            data: {
                product,
            },
        });
    }

    async fetchCart(req: AuthRequest, res: Response, next: NextFunction) {
        const prodInCart = await req.user.populate("cart.items");

        const products = prodInCart.cart.items;

        return res.json({
            success: true,
            message: "Cart fetched",
            data: {
                products,
            },
        });
    }

    async deleteProdFromCart(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        const stockId = req.body.productId.trim();

        await req.user.removeFromCart(stockId);

        return res.json({
            success: true,
            message: "Product removed from cart",
        });
    }

    async reduceProdQty(req: AuthRequest, res: Response, next: NextFunction) {
        const stockId = req.body.productId.trim();

        await req.user.reduceProdQty(stockId);

        return res.json({
            success: true,
            message: "Product quantity reduced",
        });
    }
}

export default new CartController();
