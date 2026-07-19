import type { Request, Response } from "express";
import type {
  CreateJobData,
  UpdateJobData,
} from "../validation/job.validation.js";
import { createjob, updatejob } from "../service/job.service.js";

export const createJob = async (req: Request, res: Response) => {
  try {
    const data : CreateJobData = req.body;
    const job = await createjob(data , req.user.userId);

    return res.status(201).json(job);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
