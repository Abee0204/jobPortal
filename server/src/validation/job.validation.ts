import z from "zod";

export const CreateJobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company name is required"),
  description: z.string().min(30, "Description is required"),
  location: z.string().min(1, "Location is required"),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "FREELANCE",
  ]).default("FULL_TIME"),

  salaryMin:z.coerce.number().int("Minimum salary must be a whole number").nonnegative("Cannot be negative").nullable().optional(),
  salaryMax:z.coerce.number().int("Maximum salary must be a whole number").nonnegative("Cannot be negative").nullable().optional(),
  salaryCurrency:z.string().default("USD"),

  skills: z.array(
    z.string().trim().min(1)
).min(1),

  experienceLevel: z.enum([
    "FRESHER",
    "MID",
    "SENIOR",
    "LEAD"
  ]).default("FRESHER"),

  applicationDeadline:z.coerce.date().nullable().optional(),
}).refine(
    (data)=>{
        if(data.salaryMin !== undefined && data.salaryMin !== null &&
           data.salaryMax !== undefined && data.salaryMax !== null) {
            return data.salaryMax >= data.salaryMin;
           }
        return true;
    },
    {
        message:"Maximum salary must be greater than or equal to minimum salary" ,
        path: ["salaryMax"],
    }
);

export type CreateJobData = z.infer<typeof CreateJobSchema>;

export const UpdateJobSchema = CreateJobSchema.partial();

export type UpdateJobData = z.infer<typeof UpdateJobSchema>;
