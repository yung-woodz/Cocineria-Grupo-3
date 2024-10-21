"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import dishRoutes from "./dish.routes.js" 

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/dish", dishRoutes);

export default router;