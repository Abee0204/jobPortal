import { applicationService } from "@/services/application.service";
import { useQuery } from "@tanstack/react-query";

export const useMyApplicants = (jobId: string) => {
  return useQuery({
    queryKey: ["myApplicants", jobId],
    queryFn: () => applicationService.getJobApplications(jobId),
    enabled: !!jobId,
  });
};
