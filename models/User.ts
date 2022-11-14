import mongoose, { Schema } from "mongoose";
import validator from "validator";

const UserSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
            minlength: 3,
        },
        email: {
            type: String,
            required: [true, "Email must be provided"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please provide a valid email."],
        },
        authToken: {
            type: String,
            trim: true,
        },
        resetTokenExpiration: {
            type: Date,
            trim: true,
        },
        password: {
            type: String,
            trim: false,
            required: [true, "Password must be provided"],
            minlength: 8,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

export default User;
