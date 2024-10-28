"use strict";
import { Router } from "express";
import { rolAuth } from "../middlewares/authorization.middleware.js";
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

router
  .post("/", rolAuth(['administrador', 'jefeCocina']), upload.single("image"), handleFileSizeLimit, createProduct)
  .delete("/:id", rolAuth(['administrador', 'jefeCocina']), deleteProduct)
  .put("/:id", rolAuth(['administrador', 'jefeCocina']), updateProduct)

router
  .get("/", rolAuth(['administrador', 'jefeCocina','cocinero']), getProducts)
  .get("/:id", rolAuth(['administrador', 'jefeCocina','cocinero']),getProduct)
  .put("/quantity/:id", rolAuth(['administrador', 'jefeCocina', 'cocinero']), lowStock, updateProductquantity);


export default router;