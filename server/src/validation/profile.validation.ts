import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;

export const profileSchema = z.object({
  name: z.string().min(3, "Name is too short"),

  email: z
    .string()
    .email("Invalid email")
    .transform((email) => email.trim()),

  contact: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(phoneRegex, "Enter a valid phone number"),
});