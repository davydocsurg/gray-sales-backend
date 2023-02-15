"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.AuthController = exports.StockController = exports.CategoryController = void 0;
const CategoryController_1 = __importDefault(require("./CategoryController"));
exports.CategoryController = CategoryController_1.default;
const StockController_1 = __importDefault(require("./StockController"));
exports.StockController = StockController_1.default;
const AuthController_1 = __importDefault(require("./AuthController"));
exports.AuthController = AuthController_1.default;
const UserController_1 = __importDefault(require("./UserController"));
exports.UserController = UserController_1.default;
