"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createProduct,
  getProduct,
  getProducts,

} from "../controllers/product.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .post("/", createProduct)
    .get("/detail/", getProduct)
    .get("/", getProducts);

export default router;