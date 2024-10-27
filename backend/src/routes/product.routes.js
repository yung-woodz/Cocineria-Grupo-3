"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { handleFileSizeLimit , upload } from "../middlewares/uploadArchive.middleware.js";
import { lowStock } from "../middlewares/lowStock.middleware.js";

import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  updateProductquantity,
  deleteProduct

} from "../controllers/product.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
  .post("/", upload.single("image"), handleFileSizeLimit, createProduct)
  .get("/", getProducts)
  .get("/:id", getProduct)
  .delete("/:id", deleteProduct)
  .put("/:id", updateProduct)
  .put("/quantity/:id", lowStock, updateProductquantity);


export default router;