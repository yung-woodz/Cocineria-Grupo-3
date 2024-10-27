"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

import {
    createDish,
    getDishes,
    getDish,
    updateDish,
    deleteDish,
} from "../controllers/dish.controller.js";

const router = Router();

/*router
    .use(authenticateJwt)
    .use(isAdmin);
*/
router
    .post('/dish', createDish)
    .get("/", getDishes)
    .get("/detail/", getDish)
    .patch("/detail/", updateDish)
    .delete("/detail/", deleteDish);

export default router;