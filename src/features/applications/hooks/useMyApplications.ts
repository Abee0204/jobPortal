import { useQuery } from "@tanstack/react-query";
import { applicationService } from "@/services/application.service";

export const useMyApplication = () => {
  return useQuery({
    queryKey: ["myApplications"],
    queryFn: applicationService.getMyApplications,
  });
};