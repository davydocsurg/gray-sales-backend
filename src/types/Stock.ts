import { Document, Schema } from "mongoose";

type StockType = {
    title: string;
    description: string;
    price?: number;
    type: "free" | "paid";
    pickupLocation: {
        type: "Point";
        coordinates: [number, number]; // [longitude, latitude]
        // index: "2dsphere";
    };
    pickUpTimes: string;
    listFor: number;
    images: string[] | any;
    quantity: number;
    categoryId: Schema.Types.ObjectId;
    user?: Schema.Types.ObjectId;
} & Document;

export default StockType;
