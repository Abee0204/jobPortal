import { Router } from "express";
import { createJob , deleteJobById, getAllJobs, getAllMyJobs, getJobById, updateJob } from "../controllers/job.controllers.js";

import { CreateJobSchema , UpdateJobSchema } from "../validation/job.validation.js";
import { validate } from "../middleware/validate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { Role } from "@prisma/client";
import { protect } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/" ,protect,authorize(Role.recruiter),validate(CreateJobSchema) , createJob);
router.patch("/:jobId",protect,authorize(Role.recruiter),validate(UpdateJobSchema) , updateJob);

router.get("/",getAllJobs);
router.get("/:jobId",getJobById);
router.get("/my-jobs",protect,authorize(Role.recruiter),getAllMyJobs);

router.delete("/:jobId",protect,authorize(Role.recruiter),deleteJobById);

export default router
