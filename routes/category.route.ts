import express from "express";
import CategoryController from "../controllers/CategoryController";
import { catchAsync } from "../helpers";
import { ValidateCreateCategoryRequest } from "../middlewares/validators";

const categoryRoutes = express.Router();

categoryRoutes.post(
    "/create",
    ValidateCreateCategoryRequest,
    catchAsync(CategoryController.createCategory)
);

categoryRoutes.get("/fetch", catchAsync(CategoryController.fetchCategories));

export default categoryRoutes;
