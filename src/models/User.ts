import mongoose, { Schema } from "mongoose";
import validator from "validator";
import slugify from "slugify";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Item } from "../types";
import { Logging } from "../helpers";

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
        type: {
            type: String,
            enum: {
                values: ["admin", "vendor"],
                message:
                    "{VALUE} is not supported. Accepted values are: admin and vendor",
            },
            required: [true, "User type cannot be empty"],
        },
        verificationStatus: {
            type: String,
            default: "unverified",
        },
        authToken: {
            type: String,
            trim: true,
        },
        slug: {
            type: String,
            trim: true,
        },
        resetTokenExpiration: {
            type: Date,
            trim: true,
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
        password: {
            type: String,
            trim: false,
            required: [true, "Password must be provided"],
            minlength: 8,
        },
        passwordConfirmation: {
            type: String,
            required: [true, "Please confirm your password"],
            select: false,
            validate: {
                validator: function (el: string) {
                    return el === this.password;
                },
                message: "Passwords don't match",
            },
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        emailVerfiedAt: Date,
        emailVerifyToken: String,
        passwordResetExpires: Date,
        role: {
            type: String,
            enum: {
                values: ["admin", "vendor"],
                message: "{VALUE} is not supported",
            },
            default: "vendor",
        },
        photo: {
            type: String,
            default: "users/default.png",
        },
        stocks: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stock",
        },
        cart: {
            items: [
                {
                    stock: {
                        type: Object,
                        required: true,
                    },
                    stockId: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    // Logging.info(this.id);
    this.slug = slugify(this.name + this.id, { lower: true });
    if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        this.passwordConfirmtion = undefined;
    }
    next();
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 5000;
    next();
});

UserSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

UserSchema.methods.checkPassword = async function (
    password: string,
    hash: string
) {
    return await bcrypt.compare(password, hash);
};

UserSchema.methods.changedPasswordAfter = function (token_timestamp: string) {
    if (this.passwordChangedAt) {
        const changedTimestamp =
            parseInt(this.passwordChangedAt.getTime(), 10) / 1000;
        return parseInt(token_timestamp, 10) < changedTimestamp;
    }

    return false;
};

UserSchema.methods.createPasswordResetToken = function (
    password: string,
    hash: string
) {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("vyd436")
        .update(resetToken)
        .digest("hex");
    return resetToken;
};

UserSchema.methods.addToCart = function (stock: any) {
    const cartStockIndex = this.cart.items.findIndex((cp: any) => {
        return cp.stockId.toString() === stock._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartStockIndex >= 0) {
        newQuantity = this.cart.items[cartStockIndex].quantity + 1;
        updatedCartItems[cartStockIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            stockId: stock._id,
            stock: stock,
            quantity: newQuantity,
        });
    }

    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};

UserSchema.methods.removeFromCart = function (stockId: string) {
    const updatedCartItems = this.cart.items.filter((item: Item) => {
        return item.stockId.toString() !== stockId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

UserSchema.methods.reduceStockQty = function (stockId: string) {
    const updatedCartItems = this.cart.items.map((item: Item) => {
        if (item.stockId.toString() === stockId.toString()) {
            if (item.quantity === 1) {
                return this.removeFromCart(stockId);
            } else {
                return (item.quantity -= 1);
            }
        }
        return item;
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

UserSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};

const User = mongoose.model("User", UserSchema);

export default User;
