"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const httpException_1 = __importDefault(require("../commons/httpException"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    // console.log(message, ' cast error');
    return new httpException_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `${value} is already in use. Please enter another value!`;
    return new httpException_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    let errArr = [];
    Object.keys(err.errors).forEach((key, index) => {
        errArr.push({ [key]: { message: err.errors[key]["message"] } });
    });
    return new httpException_1.default("validation error", 422, errArr);
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        error: err,
        errors: err.errors,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    // logger.error(err.details);
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        errors: err.errors,
    });
};
const errorHandler = (error, request, response, next) => {
    error.statusCode = error.statusCode;
    error.errors = error.errors || null;
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(error, response);
    }
    else if (process.env.NODE_ENV === "production") {
        let err = JSON.parse(JSON.stringify(error));
        if (err.name === "CastError")
            err = handleCastErrorDB(err);
        if (err.code === 11000)
            err = handleDuplicateFieldsDB(err);
        if (err.name === "ValidationError")
            err = handleValidationErrorDB(err);
        sendErrorProd(err, response);
    }
};
exports.errorHandler = errorHandler;
