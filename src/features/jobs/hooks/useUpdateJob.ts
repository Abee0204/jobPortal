import { jobService } from "@/services/job.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateJobData } from "../schemas/job.schema";

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      data,
    }: {
      jobId: string;
      data: CreateJobData;
    }) => jobService.updateJob(jobId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myJobs"] });
    },
  });
};