import prisma from "../config/prisma.js";
import type {
  CreateJobData,
  UpdateJobData,
} from "../validation/job.validation.js";
import type { Prisma } from "@prisma/client";

export const createjob = async (data: CreateJobData, postedById: number) => {
  const skills = data.skills.join(",");

  const createData: Prisma.JobCreateInput = {
    title: data.title,
    company: data.company,
    description: data.description,
    location: data.location,

    employmentType: data.employmentType,

    skills,

    experienceLevel: data.experienceLevel,

    postedBy: {
      connect: {
        id: postedById,
      },
    },
  };

  // 👇 Optional fields yahan

  if (data.salaryMin !== undefined) {
    createData.salaryMin = data.salaryMin;
  }

  if (data.salaryMax !== undefined) {
    createData.salaryMax = data.salaryMax;
  }

  if (data.salaryCurrency !== undefined) {
    createData.salaryCurrency = data.salaryCurrency;
  }

  if (data.applicationDeadline !== undefined) {
    createData.applicationDeadline = data.applicationDeadline;
  }

  const job = await prisma.job.create({
    data: createData,
  });

  return job;
};

export const updatejob = async (
  data: UpdateJobData,
  recruiterId: number,
  jobId: string,
) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.postedById !== recruiterId) {
    throw new Error("You are not allowed to update this job");
  }

  const updateData: Prisma.JobUpdateInput = {
    ...(data.title !== undefined && { title: data.title }),
    ...(data.company !== undefined && { company: data.company }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.location !== undefined && { location: data.location }),

    ...(data.employmentType !== undefined && {
      employmentType: data.employmentType,
    }),

    ...(data.salaryMin !== undefined && {
      salaryMin: data.salaryMin,
    }),

    ...(data.salaryMax !== undefined && {
      salaryMax: data.salaryMax,
    }),

    ...(data.salaryCurrency !== undefined && {
      salaryCurrency: data.salaryCurrency,
    }),

    ...(data.experienceLevel !== undefined && {
      experienceLevel: data.experienceLevel,
    }),

    ...(data.applicationDeadline !== undefined && {
      applicationDeadline: data.applicationDeadline,
    }),

    ...(data.skills !== undefined && {
      skills: data.skills.join(","),
    }),
  };

  const updatedJob = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: updateData,
  });

  return updatedJob;
};

export const findAllJob = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
};

export const findJobById = async (jobId: string) => {
  const jobInfo = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  return jobInfo;
};

export const setJobNotActive = async (jobId: string, recruiterId: number) => {
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      isActive: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.postedById !== recruiterId) {
    throw new Error("You are not allowed to update this job");
  }
  
  const notActiveJob = await prisma.job.update({
    where: {
      id: jobId,
    },
    data:{
      isActive:false,
    }
  });

  return notActiveJob;
};
