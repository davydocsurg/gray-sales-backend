"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const Category = mongoose_1.default.model("Category", CategorySchema);
exports.default = Category;
