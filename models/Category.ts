import mongoose, { Schema } from "mongoose";

const CategorySchema: Schema = new mongoose.Schema(
    {
        icon: {
            type: String,
            required: [true, "The icon field is required"],
        },

        label: {
            type: String,
            required: [true, "Label is required"],
        },

        backgroundColor: {
            type: String,
            required: [true, "Background color is required"],
        },

        value: {
            type: Number,
            required: [true, "Value is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
