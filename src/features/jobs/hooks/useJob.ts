import { useQuery } from "@tanstack/react-query";
import { jobService } from "@/services/job.service";

export const useJob = (jobId:string) =>{
    return useQuery({
        queryKey:["job" , jobId],
        queryFn :() => jobService.getJobById(jobId),
    });
};