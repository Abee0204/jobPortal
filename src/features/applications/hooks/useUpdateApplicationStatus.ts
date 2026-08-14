import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "@/services/application.service";
import type { ApplicationStatus } from "@/types/application.types";
import { toast } from "sonner";

export const useUpdateApplicationStatus = (jobId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: number;
      status: ApplicationStatus;
    }) => applicationService.updateApplicationStatus(applicationId, status),
    onSuccess: (data) => {
      toast.success(data.message || "Status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["myApplicants", jobId],
      });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update status";
      toast.error(message);
    },
  });
};
