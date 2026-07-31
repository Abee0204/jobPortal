import type { Request, Response } from "express";
import {
  applyForJobService,
  getAllJobApplicationsService,
  getMyApplicationService,
  updateApplicationStatusService,
} from "../service/application.service.js";
import type { UpdateApplicationStatusData } from "../validation/application.validation.js";

type JobParams = {
  jobId: string;
};

type ApplicationParams = {
  applicationId: string;
};

export const applyForJob = async (req: Request<JobParams>, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const candidateId = req.user.userId;

    const application = await applyForJobService(jobId, candidateId);

    return res.status(201).json({
      message: "Applied successfully",
      data: {
        application,
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

export const getAllJobApplications = async (
  req: Request<JobParams>,
  res: Response,
) => {
  const recruiterId = req.user.userId;
  const jobId = req.params.jobId;

  const allApplications = await getAllJobApplicationsService(
    recruiterId,
    jobId,
  );

  return res.status(200).json({
    success: true,
    data: {
      allApplications,
    },
  });
};

export const getMyApplication = async (req: Request, res: Response) => {
  try {
    const candidateId = req.user.userId;

    const myApplication = await getMyApplicationService(candidateId);

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: {
        myApplication,
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

export const updateApplicationStatus = async (
  req: Request<ApplicationParams>,
  res: Response,
) => {
  try {
    const applicationId = Number(req.params.applicationId);
    const { status }: UpdateApplicationStatusData = req.body;
    const recruiterId = req.user.userId;

    const updatedStatus = await updateApplicationStatusService(applicationId , recruiterId , status);

    return res.status(200).json({
      success:true,
      message:"status updated",
      data:{
        updatedStatus,
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
