import prisma from "../config/prisma.js";
import type { ApplicationStatus, Prisma } from "@prisma/client";
import { findJobById } from "./job.service.js";

export const applyForJobService = async (
  jobId: string,
  candidateId: number,
) => {
  const job = await findJobById(jobId);
  if (!job || !job.isActive) throw new Error("Job not found");

  const existingApplication = await prisma.application.findUnique({
    where: {
      userId_jobId: {
        userId: candidateId,
        jobId,
      },
    },
  });

  if (existingApplication)
    throw new Error("You have already applied for this job");

  const newApplication = await prisma.application.create({
    data: {
      userId: candidateId,
      jobId,
    },
  });

  return newApplication;
};

export const getAllJobApplicationsService = async (
  recruiterId: number,
  jobId: string,
) => {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      isActive: true,
    },
  });

  if (!job) throw new Error("Job not found");

  if (job?.postedById !== recruiterId)
    throw new Error("You are not authorized");

  const applications = await prisma.application.findMany({
    where: {
      jobId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return applications;
};

export const getMyApplicationService = async (candidateId: number) => {
  const myApplication = await prisma.application.findMany({
    where: {
      userId: candidateId,
    },
    include:{
        job:true,
    },
    orderBy:{
        createdAt:"desc",
    },
  });

  return myApplication;

};

export const updateApplicationStatusService = async(applicationId: number , recruiterId: number , status: ApplicationStatus) =>{
  const application = await prisma.application.findUnique({
    where:{
      id:applicationId,
    },
    include:{
      job:{
        select:{
          postedById:true,
        }
      },
    }
  });

  if(!application)
    throw new Error("Application doesn't exist");

  if(application.job.postedById !== recruiterId)
    throw new Error("You are not authorized");

  if (application.status === status) {
  throw new Error(`Application is already ${status}`);
}

  const updatedApplication = await prisma.application.update({
    where:{
      id:applicationId,
    },
    data:{
      status,
    },
  });

  return updatedApplication;
  
}
