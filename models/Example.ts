import mongoose, { Schema } from "mongoose";

const ExampleSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "The title field is required"],
            minlength: [
                5,
                "Title is shorter than the minimum allowed length (5)",
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
    },
    {
        timestamps: true,
    }
);

const Example = mongoose.model("Example", ExampleSchema);

export default Example;
