"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(message, statusCode, error = null) {
        super(message);
        this.error = null;
        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
exports.default = HttpException;
