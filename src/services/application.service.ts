import type { ApplyJobResponse } from "@/types/application.types";
import { api } from "./api"


export const applicationService = {

    async applyJob(jobId: string):Promise<ApplyJobResponse>  {
        const response = await api.post(`/jobs/${jobId}/apply`);

        return response.data;
    },
}