import type { Job } from "./job.types";

export type ApplicationStatus = "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";

export type ApplyJobResponse = {
  success: boolean;
  message: string;
  data: {
    applicationStatus: ApplicationStatus;
  };
};

export interface Application {
  id: number;
  status: ApplicationStatus;
  job: Job;
  userId: number;
}

export type Applicant = {
  id: number;
  status: ApplicationStatus;
  jobId: string;
  userId: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type GetMyApplicationsResponse = {
  success: boolean;
  message: string;
  data: {
    myApplication: Application[];
  };
};

export type GetJobApplicantsResponse = {
  success: boolean;
  data: {
    allApplications: Applicant[];
  };
};

export type UpdateApplicationStatusResponse = {
  success: boolean;
  message: string;
  data: {
    updatedStatus: {
      id: number;
      status: ApplicationStatus;
      jobId: string;
      userId: number;
      createdAt: string;
      updatedAt: string;
    };
  };
};