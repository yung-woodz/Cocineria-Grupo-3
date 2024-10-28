"use strict";
import { Router } from "express";
import { isAdmin, isWaiter } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createOrder,
    deleteOrder,
    getOrders,
    updateOrder,
} from "../controllers/order.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin)

router
    .get("/", getOrders) //Obtener todas las ordenes
    .post("/", createOrder) //Crear una orden
    .patch("/:id", updateOrder) //Actualizar una orden
    .delete("/:id", deleteOrder); //Eliminar una orden

export default router;