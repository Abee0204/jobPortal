import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { Role } from "@prisma/client";
import { getMyApplication, updateApplicationStatus } from "../controllers/application.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { UpdateApplicationStatusSchema } from "../validation/application.validation.js";

const router = Router();

router.get("/my",protect,authorize(Role.candidate),getMyApplication);

router.patch("/:applicationId",protect,authorize(Role.recruiter),validate(UpdateApplicationStatusSchema),updateApplicationStatus);

export default router;