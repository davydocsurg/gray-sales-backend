"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.stockRoutes = exports.categoryRoutes = void 0;
const category_route_1 = __importDefault(require("./category.route"));
exports.categoryRoutes = category_route_1.default;
const stock_route_1 = __importDefault(require("./stock.route"));
exports.stockRoutes = stock_route_1.default;
const user_routes_1 = __importDefault(require("./user.routes"));
exports.userRoutes = user_routes_1.default;
