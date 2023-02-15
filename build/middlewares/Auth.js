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
const constants_1 = require("../commons/constants");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const jwt_key = constants_1.JWT_SECRET;
const isAuthenticated = (0, helpers_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const logInSession: boolean = await req?.session.isLoggedIn;
    // if (!logInSession) {
    //     return res.redirect("/login");
    // }
    // return next();
    let token;
    // check if token is set
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new helpers_1.AppError("Unauthorized. Please login to continue.", 401));
    }
    let payload;
    // verify token
    try {
        payload = jsonwebtoken_1.default.verify(token, jwt_key);
    }
    catch (error) {
        return next(new helpers_1.AppError(error.message, 401));
    }
    helpers_1.Logging.warn(`${payload} payload`);
    // check if user still exists in the database
    const currentUser = yield models_1.User.findById(payload.id);
    if (!currentUser) {
        return next(new helpers_1.AppError("This User does not exist", 401));
    }
    // check if user's password is still thesame since token issue
    const passwordChanged = yield currentUser.changedPasswordAfter(payload.iat);
    if (passwordChanged) {
        return next(new helpers_1.AppError("User recently changed password. Please, login again", 401));
    }
    // grant access
    req.user = currentUser;
    return next();
}));
exports.default = isAuthenticated;
