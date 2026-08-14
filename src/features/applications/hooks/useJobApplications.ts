import { applicationService } from "@/services/application.service"
import { useQuery } from "@tanstack/react-query"


export const useJobApplications = (jobId:string) =>{
    return useQuery({
        queryKey:["jobApplications",jobId],
        queryFn: () => applicationService.getJobApplications(jobId),
        enabled: !!jobId,
    });
};