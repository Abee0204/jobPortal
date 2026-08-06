import z from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  description: z.string().min(10),
  location: z.string().min(1),
  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "FREELANCE",
  ]),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
  salaryCurrency: z.string().default("INR"),
  skills: z.string().transform((value) =>
  value.split(",").map((s) => s.trim()).filter(Boolean)
),
  experienceLevel: z.enum([
    "FRESHER",
    "MID",
    "SENIOR",
    "LEAD",
  ]),
  applicationDeadline: z.string().nullable().optional(),
});

export type CreateJobFormInput = z.input<typeof createJobSchema>;
export type CreateJobData = z.output<typeof createJobSchema>;