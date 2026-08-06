import { jobService } from "@/services/job.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateJob = () => {

    const queryClient = useQueryClient();

   return useMutation({
    mutationFn: jobService.createJob,
    onSuccess:() => queryClient.invalidateQueries({
        queryKey:["myJobs"],
    }),
    });
};

