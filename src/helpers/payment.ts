import PayStack from "@paystack/paystack-sdk";
import { Response } from "express";
import { AuthRequest } from "../types";
import Logging from "./customLog";

const paystack = new PayStack(process.env.PAYSTACK_SECRET_KEY);

export const initializePayment = async (
    req: AuthRequest,
    res: Response,
    amount: number
) => {
    try {
        const email = req.user.email;

        const response = await paystack.transaction.initialize({
            amount,
            email,
        });

        return response;
    } catch (error: any) {
        Logging.error(error);
    }
};

export const verifyTransaction = async (ref: string) => {
    const response = await paystack.transaction.verify({
        reference: ref,
    });

    return response;
};
