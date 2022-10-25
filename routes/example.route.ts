import express from "express";
import ExampleController from "../controllers/ExampleController";
import { catchAsync } from "../helpers";

const exampleRoutes = express.Router();

exampleRoutes.post("/example", catchAsync(ExampleController.createExample));
