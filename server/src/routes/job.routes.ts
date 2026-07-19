import { Router } from "express";
import { createJob , updateJob } from "../controllers/job.controllers.js";

import { CreateJobSchema , UpdateJobSchema } from "../validation/job.validation.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.post("/" ,validate(CreateJobSchema) , createJob);
router.patch("/:id",validate(UpdateJobSchema) , updateJob);

export default router
