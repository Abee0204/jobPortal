import type { Application } from "@/types/application.types";
import { Building2, MapPin, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type ApplicationDetails = {
  application: Application;
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "ACCEPTED":
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50";
    case "REJECTED":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50";
    case "REVIEWING":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50";
    default:
      return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-900/50";
  }
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const ApplicationCard = ({ application }: ApplicationDetails) => {
  const job = application.job;
  const formattedSalary =
    job?.salaryMin && job?.salaryMax
      ? `${formatCurrency(job.salaryMin, job.salaryCurrency)} - ${formatCurrency(
          job.salaryMax,
          job.salaryCurrency
        )}`
      : "Salary not disclosed";

  return (
    <Link
      to={`/jobs/${job?.id}`}
      className="group flex flex-col sm:flex-row sm:items-center justify-between border border-slate-100 rounded-2xl p-5 shadow-sm bg-white hover:shadow-md hover:border-slate-200/80 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700/80 gap-4"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary/5 text-primary dark:bg-primary/20 h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-extrabold text-sm border border-primary/10">
            {job?.company?.substring(0, 2).toUpperCase() || "JB"}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-950 dark:text-slate-50 group-hover:text-primary transition-colors leading-tight">
              {job?.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mt-0.5">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              <span>{job?.company}</span>
            </div>
          </div>
        </div>

        {/* Details list */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground pl-1 bg-slate-50/50 p-2 rounded-xl border border-slate-100/50 dark:bg-slate-950/20 dark:border-slate-800">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>{job?.location}</span>
          </div>
          <div className="h-3 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-0.5">
            <DollarSign className="h-3.5 w-3.5 text-slate-400" />
            <span>{formattedSalary}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Status:</span>
          <span
            className={`text-xs px-2.5 py-1 font-semibold rounded-full border ${getStatusStyles(
              application.status
            )}`}
          >
            {application.status}
          </span>
        </div>
        <div className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 hidden sm:block shrink-0">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};
