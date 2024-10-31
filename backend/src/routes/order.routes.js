"use strict";
import { Router } from "express";
import { isAdmin, rolAuth } from "../middlewares/authorization.middleware.js";
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

router
    .get("/", rolAuth(["mesero","cocinero", "jefeCocina", "administrador"]), getOrders) //Obtener todas las ordenes
    .post("/", rolAuth(["mesero", "jefeCocina", "administrador"]), createOrder) //Crear una orden
    .patch("/:id", rolAuth(["mesero","cocinero", "jefeCocina", "administrador"]), updateOrder) //Actualizar una orden
    .delete("/:id", ["mesero", "jefeCocina", "administrador"], deleteOrder); //Eliminar una orden

export default router;