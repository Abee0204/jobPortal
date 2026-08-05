import { jobService } from "@/services/job.service"
import { useQuery } from "@tanstack/react-query"


export const useMyJobs = () => {
    return useQuery({
        queryKey: ["myJobs"],
        queryFn: jobService.getAllMyJobs,
    });
}