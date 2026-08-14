import type {
  ApplyJobResponse,
  GetMyApplicationsResponse,
  GetJobApplicantsResponse,
  ApplicationStatus,
  UpdateApplicationStatusResponse,
} from "@/types/application.types";
import { api } from "./api";

export const applicationService = {
  async applyJob(jobId: string): Promise<ApplyJobResponse> {
    const response = await api.post(`/jobs/${jobId}/apply`);

    return response.data;
  },

  async getMyApplications(): Promise<GetMyApplicationsResponse> {
    const response = await api.get("/applications/my");
    return response.data;
  },

  async getJobApplications(jobId: string): Promise<GetJobApplicantsResponse> {
    const response = await api.get(`/jobs/${jobId}/applicants`);
    return response.data;
  },

  async updateApplicationStatus(
    applicationId: number,
    status: ApplicationStatus
  ): Promise<UpdateApplicationStatusResponse> {
    const response = await api.patch(`/applications/${applicationId}`, {
      status,
    });
    return response.data;
  },
};


