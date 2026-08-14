import type { Job } from "@/types/job.types";
import { MapPin, Briefcase, DollarSign, Calendar, ArrowRight } from "lucide-react";

type JobCardProps = {
  job: Job;
};

const getEmploymentTypeLabel = (type: string) => {
  switch (type) {
    case "FULL_TIME":
      return "Full Time";
    case "PART_TIME":
      return "Part Time";
    case "CONTRACT":
      return "Contract";
    case "INTERNSHIP":
      return "Internship";
    case "FREELANCE":
      return "Freelance";
    default:
      return type;
  }
};

const getExperienceLevelLabel = (level: string) => {
  switch (level) {
    case "FRESHER":
      return "Fresher";
    case "MID":
      return "Mid Level";
    case "SENIOR":
      return "Senior Level";
    case "LEAD":
      return "Lead Level";
    default:
      return level;
  }
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function JobCard({ job }: JobCardProps) {
  const formattedSalary =
    job.salaryMin && job.salaryMax
      ? `${formatCurrency(job.salaryMin, job.salaryCurrency)} - ${formatCurrency(
          job.salaryMax,
          job.salaryCurrency
        )}`
      : "Salary not disclosed";

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700/80">
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-950 dark:text-slate-50 group-hover:text-primary transition-colors leading-tight">
              {job.title}
            </h3>
            <p className="text-sm font-semibold text-muted-foreground">
              {job.company}
            </p>
          </div>
          {/* Custom Logo/Avatar placeholder */}
          <div className="bg-primary/5 text-primary dark:bg-primary/20 h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-extrabold text-sm border border-primary/10">
            {job.company.substring(0, 2).toUpperCase()}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-600 dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-300">
            <Briefcase className="h-3 w-3 text-slate-400" />
            {getEmploymentTypeLabel(job.employmentType)}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10 text-primary dark:bg-primary/25 dark:text-primary-foreground/90">
            {getExperienceLevelLabel(job.experienceLevel)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-800/60 my-5" />

      {/* Footer info */}
      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <DollarSign className="h-3.5 w-3.5 text-slate-400" />
            <span>{formattedSalary}</span>
          </div>
          {job.createdAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{timeAgo(job.createdAt)}</span>
            </div>
          )}
        </div>

        <div className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 hidden sm:block shrink-0">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
