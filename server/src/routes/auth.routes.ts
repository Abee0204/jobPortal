import { Router } from "express";
import { register , login , getCurrentUser } from "../controller/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me" , getCurrentUser);

export default router