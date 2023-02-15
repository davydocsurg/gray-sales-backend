"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);
        this.errors = null;
        this.statusCode = statusCode;
        this.status = false;
        this.errors = errors;
        this.details = message;
        this.isOperationalError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
