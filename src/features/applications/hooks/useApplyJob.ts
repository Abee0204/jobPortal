import { applicationService } from "@/services/application.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApplyJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => applicationService.applyJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myApplications"],
      });
    },
  });
};
