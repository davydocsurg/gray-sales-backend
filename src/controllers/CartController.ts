import { NextFunction, Request, Response } from "express";
import { Stock } from "../models";
import { AuthRequest } from "../types";

class CartController {
    constructor() {}

    async addProdToCart(req: AuthRequest, res: Response, next: NextFunction) {
        const prodId = req.body.productId.trim();

        const product = await Stock.findById(prodId);
        if (!product) {
            return res.json({
                success: false,
                message: "Product not found",
            });
        }

        return res.json({
            success: true,
            message: "Product added to cart",
            data: {
                product,
            },
        });
    }

    async fetchCart(req: AuthRequest, res: Response, next: NextFunction) {
        const cart = await req.user.cart.populate("cart.items");

        const products = cart.cart.items.map((i) => {
            return {
                ...i.productId._doc,
                quantity: i.quantity,
            };
        });

        console.log(products);
    }
}

export default new CartController();
