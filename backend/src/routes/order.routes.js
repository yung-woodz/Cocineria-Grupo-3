"use strict";
import { Router } from "express";
import { isWaiter } from "../middlewares/authorization.middleware.js";
import {
    createOrder,
    deleteOrder,
    getOrders,
    updateOrder,
} from "../controllers/order.controller.js";

const router = Router();

router
    .use(isWaiter);

router
    .get("/", getOrders) //Obtener todas las ordenes
    .post("/", createOrder) //Crear una orden
    .patch("/:id", updateOrder) //Actualizar una orden
    .delete("/id", deleteOrder); //Eliminar una orden

export default router;