import { Router } from "express";
import { createJob , getAllJob, updateJob } from "../controllers/job.controllers.js";

import { CreateJobSchema , UpdateJobSchema } from "../validation/job.validation.js";
import { validate } from "../middleware/validate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { Role } from "@prisma/client";
import { protect } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/" ,protect,authorize(Role.recruiter),validate(CreateJobSchema) , createJob);
router.patch("/:id",protect,authorize(Role.recruiter),validate(UpdateJobSchema) , updateJob);

router.get("/",getAllJob)

export default router
