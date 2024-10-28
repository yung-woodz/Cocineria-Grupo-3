"use strict";
import { Router } from "express";
import { rolAuth } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

import {
    createDish,
    getDishes,
    getDish,
    updateDish,
    deleteDish,
} from "../controllers/dish.controller.js";

const router = Router();

router
    .use(authenticateJwt)

router
    .post('/dish', rolAuth(['administrador', 'jefeCocina']), createDish)
    .get("/", rolAuth(['administrador', 'jefeCocina']), getDishes)
    .get("/detail/", rolAuth(['administrador', 'jefeCocina']), getDish)
    .patch("/detail/", rolAuth(['administrador', 'jefeCocina']), updateDish)
    .delete("/detail/", rolAuth(['administrador', 'jefeCocina']), deleteDish);

export default router;