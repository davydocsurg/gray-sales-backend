import mongoose, { Schema } from "mongoose";

const StockSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title field is required"],
            minlength: [
                3,
                "Title is shorter than the minimum allowed length (3)",
            ],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            minlength: [
                10,
                "Description is shorter than the minimum allowed length (10)",
            ],
        },

        price: {
            type: Number,
            required: [true, "Price field is required"],
        },

        images: {
            type: Array,
            required: [true, "At least one image is required"],
        },

        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

// StockSchema.pre('save', async function (next) {

// })

const Stock = mongoose.model("Stock", StockSchema);

export default Stock;
