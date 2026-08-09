import type { Job } from "./job.types";

export type ApplyJobResponse = {
  success: boolean;
  message: string;
  data: {
    applicationStatus: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";
  };
};

export interface Application {
  id: number;
  status: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";
  job : Job;
  userId: number;
};