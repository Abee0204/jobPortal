import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { Role } from "@prisma/client";
import { getMyApplication } from "../controllers/application.controller.js";

const router = Router();

router.get("/my",protect,authorize(Role.candidate),getMyApplication);


export default router;