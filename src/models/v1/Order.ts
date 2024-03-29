import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    stocks: [
        {
            stock: {
                type: Object,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],

    user: {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

        email: {
            type: String,
            required: true,
        },
    },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
