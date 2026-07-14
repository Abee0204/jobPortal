import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(1,"Enter password"),
}) 

export type LoginFormData = z.infer<typeof loginSchema>