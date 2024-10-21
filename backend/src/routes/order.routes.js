"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  getOrder,
  getOrders,
} from "../controllers/order.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/detail-orders/", getOrders)
  /* .post("/create-order", createOrder) */
  .get("/detail-order/", getOrder)
  /* .patch("/detail/", updateUser)
  .delete("/detail/", deleteUser) */;

export default router;