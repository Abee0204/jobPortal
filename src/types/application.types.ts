export type ApplyJobResponse = {
  success: boolean;
  message: string;
  data: {
    application: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";
  };
};
