import { jobService } from "@/services/job.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobService.deleteJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["myJobs"] });
    },
  });
};