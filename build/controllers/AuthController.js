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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const User_1 = __importDefault(require("../models/User"));
const constants_1 = require("../commons/constants");
const signToken = (id, type) => {
    const jwt_key = constants_1.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ id, type }, jwt_key, { expiresIn: "1d" });
    return token;
};
const createSendToken = (user, statusCode = 200, res) => {
    const token = signToken(user._id, user.type);
    if (process.env.NODE_ENV === "production")
        constants_1.cookieOptions.secure = true;
    res.cookie("jwt", token, constants_1.cookieOptions);
    res.status(statusCode).json({
        success: true,
        token,
        user,
    });
};
class AuthController {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.login = this.login.bind(this);
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const email = req.body.email;
                const password = req.body.password;
                const passwordConfirmation = req.body.passwordConfirmation;
                const userExists = yield (0, helpers_1.checkUser)(email, res, next);
                if (userExists) {
                    return res.status(409).json({
                        success: false,
                        message: "User Already Exist. Please Login",
                    });
                }
                // const hashedPwd = await bcrypt.hash(password, 12);
                const user = yield User_1.default.create({
                    name: name,
                    email: email,
                    password: password,
                    passwordConfirmation: passwordConfirmation,
                    type: "vendor",
                    verificationStatus: "unverfied",
                });
                yield user.save({ validateBeforeSave: false });
                return res.status(200).json({
                    success: true,
                    message: "Registration successful",
                    data: null,
                });
            }
            catch (error) {
                helpers_1.Logging.error(error);
                return res.json({
                    success: false,
                    errors: { error },
                });
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // const user = await verifyUserLoginDetails(email, password, res, next);
            // if (user === null) {
            //     return res.json({
            //         success: false,
            //         message: "User does not exist. Please Register",
            //     });
            // }
            const user = yield User_1.default.findOne({ email }).select("+password");
            if (!user || !(yield user.checkPassword(password, user.password))) {
                let errors = {
                    email: "Email or password is incorrect",
                };
                return next(new helpers_1.AppError("Incorrect credentials", 422, errors));
            }
            user.password = undefined;
            req.user = user;
            createSendToken(user, 200, res);
            // jwt.sign(
            //     { user: user },
            //     "secretKey",
            //     (err: unknown, token: unknown) => {
            //         if (err) {
            //             return Logging.error(err);
            //         }
            //         return res.json({
            //             success: true,
            //             message: "Login successful",
            //             data: {
            //                 user,
            //                 token: token,
            //             },
            //         });
            //     }
            // );
        });
    }
}
exports.default = new AuthController();
