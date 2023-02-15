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
exports.verifyUserLoginDetails = exports.checkUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const appError_1 = require("./appError");
const checkUser = (email, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield findUserByEmail(email);
    if (user) {
        return true;
    }
    return false;
});
exports.checkUser = checkUser;
const verifyUserLoginDetails = (email, password, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await findUserByEmail(email);
    const user = yield models_1.User.findOne({ email }).select("+password");
    if (!user || !(yield user.checkPassword(password, user.password))) {
        let errors = {
            email: "Email or password is incorrect",
        };
        return next(new appError_1.AppError("Incorrect credentials", 422, errors));
    }
    // await validatePassword(user, password, res, next);
    return user;
});
exports.verifyUserLoginDetails = verifyUserLoginDetails;
const validatePassword = (user, password, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const comparePwd = yield bcryptjs_1.default.compare(password === null || password === void 0 ? void 0 : password.trim(), user === null || user === void 0 ? void 0 : user.password.trim());
    if (!comparePwd) {
        let errors = "Email or password is not correct. Please check and try again";
        return next(new appError_1.AppError("Incorrect credentials", 422, errors));
    }
    // return next();
});
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ email: email });
    return user;
});
