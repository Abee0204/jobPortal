import type { Request, Response } from "express";
import type {
  CreateJobData,
  UpdateJobData,
} from "../validation/job.validation.js";
import {
  createjob,
  updatejob,
  findAllJob,
  findJobById,
  setJobNotActive,
} from "../service/job.service.js";

export const createJob = async (req: Request, res: Response) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "You are not autherized to create job",
      });
    }

    const data: CreateJobData = req.body;
    const job = await createjob(data, req.user.userId);

    return res.status(201).json({
      success: true,
      data: {
        job,
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

export const updateJob = async (req: Request<JobParams>, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.userId;

    const data: UpdateJobData = req.body;
    Object.keys(data).forEach(
      (key) =>
        data[key as keyof typeof data] === undefined &&
        delete data[key as keyof typeof data],
    );

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const job = await updatejob(data, userId, jobId);

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: {
        job,
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

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await findAllJob();

    return res.status(200).json({
      success: true,
      data: {
        jobs,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

type JobParams = {
  jobId: string;
};

export const getJobById = async (req: Request<JobParams>, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const job = await findJobById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        job,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteJobById = async(req: Request<JobParams>,res: Response) => {
  const jobId = req.params.jobId;
  const userId = req.user.userId;

  const job = await setJobNotActive(jobId , userId);
}