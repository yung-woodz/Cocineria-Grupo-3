"use strict";
import { Router } from "express";
import { rolAuth } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  createUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router
  .use(authenticateJwt)


router
  .get("/", rolAuth(['administrador', 'jefeCocina']), getUsers)
  .get("/detail/", rolAuth(['administrador', 'jefeCocina']), getUser)
  .post("/", rolAuth(['administrador', 'jefeCocina']), createUser)
  .patch("/detail/", rolAuth(['administrador', 'jefeCocina']), updateUser)
  .delete("/detail/", rolAuth(['administrador', 'jefeCocina']), deleteUser);

export default router;