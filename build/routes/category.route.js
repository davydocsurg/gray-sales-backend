"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const helpers_1 = require("../helpers");
const validators_1 = require("../middlewares/validators");
const categoryRoutes = express_1.default.Router();
categoryRoutes.post("/create", validators_1.ValidateCreateCategoryRequest, (0, helpers_1.catchAsync)(CategoryController_1.default.createCategory));
categoryRoutes.get("/fetch", (0, helpers_1.catchAsync)(CategoryController_1.default.fetchCategories));
categoryRoutes.get("/:catId", (0, helpers_1.catchAsync)(CategoryController_1.default.fetchCategory));
categoryRoutes.put("/:catId/update", (0, helpers_1.catchAsync)(CategoryController_1.default.updateCategory));
categoryRoutes.delete("/:catId/delete", (0, helpers_1.catchAsync)(CategoryController_1.default.deleteCategory));
exports.default = categoryRoutes;
