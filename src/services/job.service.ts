import type {
  CreateJobData,
} from "@/features/jobs/schemas/job.schema";
import { api } from "./api";
import type { Job } from "@/types/job.types";

export const jobService = {
  async getAllJobs(): Promise<Job[]> {
    const response = await api.get("/jobs");

    return response.data.data.jobs;
  },

  async getJobById(jobId: string): Promise<Job> {
    const response = await api.get(`/jobs/${jobId}`);

    return response.data.data.job;
  },

  async getAllMyJobs(): Promise<Job[]> {
    const response = await api.get("/jobs/my-jobs");

    return response.data.data.myJobs;
  },

  createJob: async (data: CreateJobData): Promise<Job> => {
    const response = await api.post("/jobs", data);

    return response.data.data.job;
  },

  updateJob: async (jobId: string, data: CreateJobData) => {
    const response = await api.patch(`/jobs/${jobId}`, data);
    return response.data.data.job;
  },

  deleteJob: async (jobId: string): Promise<void> => {
    await api.delete(`/jobs/${jobId}`);
    return;
  }
};
