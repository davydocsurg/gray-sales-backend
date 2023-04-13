import mongoose, { Schema } from "mongoose";
import { StockType } from "../../types";

const StockSchema: Schema = new mongoose.Schema<StockType>(
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
            required: function () {
                return this.type === "paid";
            },
        },

        type: {
            type: String,
            enum: {
                values: ["free", "paid"],
                message:
                    "{VALUE} is not supported. Accepted values are: free and paid",
            },
        },

        location: {
            // location to include longitude and latitude
            type: String,
            required: [true, "Location is required"],
        },

        pickUpTimes: {
            type: String,
            required: [true, "Kindly provide pick up times"],
            // times must be during the day
        },

        listFor: {
            type: Number,
            required: [
                true,
                "Kindly provide how long your listing will be available",
            ],
            // provide a range of 1-15 days
            min: [1, "Minimum number of days must be 1"],
            max: [15, "Maximum number of days is 15"],
        },

        images: {
            type: [String],
            required: [true, "At least one image is required"],
        },

        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
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
