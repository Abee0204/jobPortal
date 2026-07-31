import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { Role } from "@prisma/client";
import { getCandidates, getMyApplication } from "../controllers/application.controller.js";

const router = Router();

router.get("/my",protect,authorize(Role.candidate),getMyApplication);

router.get("/candidates",protect,authorize(Role.recruiter),getCandidates);

export default router;