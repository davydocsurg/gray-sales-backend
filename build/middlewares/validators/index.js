"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.ValidateCreateStockRequest = exports.ValidateCreateCategoryRequest = void 0;
const createCategory_1 = __importDefault(require("./createCategory"));
exports.ValidateCreateCategoryRequest = createCategory_1.default;
const createStock_1 = __importDefault(require("./createStock"));
exports.ValidateCreateStockRequest = createStock_1.default;
const validate_1 = __importDefault(require("./validate"));
exports.validate = validate_1.default;
