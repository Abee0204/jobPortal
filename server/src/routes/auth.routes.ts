import {Router} from "express";
import {register , login , getCurrentUser} from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

const router = Router();

router.post("/register",validate(registerSchema), register);
router.post("/login",validate(loginSchema) , login);

router.get("/me" , getCurrentUser);

export default router