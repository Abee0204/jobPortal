import type { Application, ApplyJobResponse } from "@/types/application.types";
import { api } from "./api";

type GetMyApplicationsResponse = {
  success: boolean;
  message: string;
  data: {
    myApplication: Application[];
  };
};
export const applicationService = {
  async applyJob(jobId: string): Promise<ApplyJobResponse> {
    const response = await api.post(`/jobs/${jobId}/apply`);

    return response.data;
  },

  async getMyApplications(): Promise<GetMyApplicationsResponse> {
    const response = await api.get("/applications/my");
    return response.data;
  },

  async getJobApplications(jobId:string) {
    const response = await api.get(`/jobs/${jobId}/applicants `);
    return response.data;
  }
};
