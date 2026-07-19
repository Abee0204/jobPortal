import prisma from "../config/prisma.js";
import type { CreateJobData } from "../validation/job.validation.js";
import type { Prisma } from "@prisma/client";


export const createjob = async (
    data :CreateJobData , postedById :number
) => {
    const skills = data.skills.join(",");

   const createData : Prisma.JobCreateInput = {
  title: data.title,
  company: data.company,
  description: data.description,
  location: data.location,

  employmentType: data.employmentType,

  skills,

  experienceLevel: data.experienceLevel,

  postedBy:{
    connect:{
        id:postedById,
    }
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

export const updatejob = async () => {};
