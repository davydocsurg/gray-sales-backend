"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const options = {
    mongoUrl: process.env.MONGO_DB_URL,
    ttl: 14 * 24 * 60 * 60,
    collectionName: "sessions",
    stringify: false,
};
exports.sessionMiddleware = (0, express_session_1.default)({
    secret: "auth-user-session",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: connect_mongo_1.default.create(options),
});
