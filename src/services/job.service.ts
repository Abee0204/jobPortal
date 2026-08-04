import { api } from "./api";
import type { Job } from "@/types/job.types";

export const jobService = {
    async getAllJobs(): Promise<Job[]> {
        const response = await api.get("/jobs");

        return response.data.data.jobs;
    },

    async getJobById(jobId :string): Promise<Job> {
        const response = await api.get(`/jobs/${jobId}`);

        return response.data.data.job;
    }
};