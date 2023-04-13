import { Schema } from "mongoose";

type StockType = {
    title: string;
    description: string;
    price?: number;
    type: "free" | "paid";
    location: {
        type: "Point";
        coordinates: [number, number]; // [longitude, latitude]
        index: "2dsphere";
    };
    pickUpTimes: string;
    listFor: number;
    images: string[];
    quantity: number;
    categoryId: Schema.Types.ObjectId;
    user?: Schema.Types.ObjectId;
};

export default StockType;
