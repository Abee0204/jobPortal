import { jobService } from "@/services/job.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteJob = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:jobService.deleteJob,

        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey:["jobs"],
            });
        },
    });
};