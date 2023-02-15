"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const slugify_1 = __importDefault(require("slugify"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const UserSchema = new mongoose_1.default.Schema({
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
        validate: [validator_1.default.isEmail, "Please provide a valid email."],
    },
    type: {
        type: String,
        enum: {
            values: ["admin", "vendor"],
            message: "{VALUE} is not supported. Accepted values are: admin and vendor",
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
            validator: function (el) {
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Stock",
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Logging.info(this.id);
        this.slug = (0, slugify_1.default)(this.name + this.id, { lower: true });
        if (this.isModified("password")) {
            this.password = yield bcryptjs_1.default.hash(this.password, 12);
            this.passwordConfirmtion = undefined;
        }
        next();
    });
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password") || this.isNew)
            return next();
        this.passwordChangedAt = Date.now() - 5000;
        next();
    });
});
UserSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});
UserSchema.methods.checkPassword = function (password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, hash);
    });
};
UserSchema.methods.changedPasswordAfter = function (token_timestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime(), 10) / 1000;
        return parseInt(token_timestamp, 10) < changedTimestamp;
    }
    return false;
};
UserSchema.methods.createPasswordResetToken = function (password, hash) {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto_1.default
        .createHash("vyd436")
        .update(resetToken)
        .digest("hex");
    return resetToken;
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
