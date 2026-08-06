export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;

  employmentType:
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACT"
    | "INTERNSHIP"
    | "FREELANCE";

  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;

  skills: string;

  experienceLevel: "FRESHER" | "MID" | "SENIOR" | "LEAD";

  applicationDeadline: string | null;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
