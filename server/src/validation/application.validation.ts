import { ApplicationStatus } from "@prisma/client";
import z from "zod";


export const UpdateApplicationStatusSchema = z.object({
    status:z.nativeEnum(ApplicationStatus),
});

export type UpdateApplicationStatusData = z.infer<typeof UpdateApplicationStatusSchema>;