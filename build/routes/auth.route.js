"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const helpers_1 = require("../helpers");
const createUser_1 = __importDefault(require("../middlewares/validators/createUser"));
const authRoutes = express_1.default.Router();
authRoutes.post("/register", createUser_1.default, (0, helpers_1.catchAsync)(AuthController_1.default.createUser));
authRoutes.post("/login", (0, helpers_1.catchAsync)(AuthController_1.default.login));
exports.default = authRoutes;
