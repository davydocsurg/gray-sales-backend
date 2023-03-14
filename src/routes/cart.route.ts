import express from "express";
import { CartController } from "../controllers";

const cartRoute = express.Router();

cartRoute.post("/add", CartController.addProdToCart);

export default cartRoute;
