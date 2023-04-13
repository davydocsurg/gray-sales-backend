import { Schema } from "mongoose";

type CartType = {
    items: [
        {
            stock: {
                type: Object;
                required: true;
            };
            stockId: {
                type: Schema.Types.ObjectId;
                ref: "User";
                required: true;
            };
            quantity: {
                type: number;
                required: true;
            };
        }
    ];
};

type UserType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    passwordChangedAt: Date;
    passwordResetToken: string;
    emailVerfiedAt: Date;
    emailVerifyToken: string;
    passwordResetExpires: Date;
    role: string;
    photo: string;
    stocks: Schema.Types.ObjectId;
    cart: CartType;
    type: string;
    verificationStatus: string;
    authToken: string;
    slug: string;
    resetTokenExpiration: Date;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    location: {
        type: {
            type: string;
            enum: ["Point"];
            required: true;
        };
        coordinates: [number, number];
    };
};

export default UserType;
