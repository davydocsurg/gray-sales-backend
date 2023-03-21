import PayStack from "@paystack/paystack-sdk";
import { Response } from "express";
import { AuthRequest } from "../types";
import Logging from "./customLog";

const paystack = new PayStack(process.env.PAYSTACK_SECRET_KEY);

export const initializePayment = async (req: AuthRequest, res: Response) => {
    try {
        const { amount, email } = req.body;
        const response = await paystack.transaction.initialize({
            amount,
            email,
        });

        Logging.success(response);
        return res.json({
            success: true,
            message: "Payment initialized",
        });
    } catch (error: any) {
        Logging.error(error);
    }
};
