import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMyProfile, updateProfile } from "../controllers/profile.controller.js";

const router = Router();

router.get("/me", protect, getMyProfile);
router.patch("/", protect, updateProfile);

export default router;