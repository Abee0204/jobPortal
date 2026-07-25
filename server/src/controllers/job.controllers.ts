import type { Request, Response } from "express";
import type {
  CreateJobData,
  UpdateJobData,
} from "../validation/job.validation.js";
import { createjob, updatejob } from "../service/job.service.js";
import { success } from "zod";

export const createJob = async (req: Request, res: Response) => {
  try {

    if(req.user.role !== "recruiter")
    {
      return res.status(403).json({
        success:false,
        message:"You are not autherized to create job",
      })
    }

    const data : CreateJobData = req.body;
    const job = await createjob(data , req.user.userId);

    return res.status(201).json({
      success:true,
      data:{
        job
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
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
