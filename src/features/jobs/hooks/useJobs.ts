import { useQuery } from "@tanstack/react-query";
import { jobService } from "@/services/job.service";

export const useJobs = () => {
    return useQuery({
        queryKey: ["jobs"],
        queryFn : jobService.getAllJobs,
    });
};

