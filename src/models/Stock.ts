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
            type: String,
            required: [true, "Location is required"],
        },

        pickUpTimes: {
            type: String,
            required: [true, "Kindly provide pick up times"],
        },

        listFor: {
            type: Number,
            required: [
                true,
                "Kindly provide how long your listing will be available",
            ],
            // provide a range of 1-30 days
            min: [1, "Minimum value is 1"],
            max: [30, "Maximum value is 30"],
        },

        images: {
            type: Array,
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
