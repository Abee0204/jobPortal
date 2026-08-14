import { useJob } from "@/features/jobs/hooks/useJob";
import { Link, useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDeleteJob } from "@/features/jobs/hooks/useDeleteJob";
import { useApplyJob } from "@/features/applications/hooks/useApplyJob";
import { useMyApplication } from "@/features/applications/hooks/useMyApplications";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  ArrowLeft,
  Trash2,
  Edit,
  Users,
  CheckCircle,
  Clock,
  Building,
} from "lucide-react";

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

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

  const deleteJobMutation = useDeleteJob();
  const applyJobMutation = useApplyJob();
  const { data: myApplications } = useMyApplication();

  if (!jobId) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">Job not found</h2>
        <Link to="/jobs" className="text-primary hover:underline font-bold mt-2">
          Back to Listings
        </Link>
      </div>
    );
  }

  const handleDelete = (jobId: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }
    deleteJobMutation.mutate(jobId, {
      onSuccess: () => {
        toast.success("Job deleted successfully");
        navigate("/jobs");
      },
      onError: (error: any) => {
        const res = error?.response?.data;
        let message = "Something went wrong";
        if (res?.message) {
          message = res.message;
        } else if (res?.errors) {
          const firstKey = Object.keys(res.errors)[0];
          const firstError = res.errors[firstKey];
          if (Array.isArray(firstError)) {
            message = firstError[0];
          }
        }
        toast.error(message);
      },
    });
  };

  const handleApply = (jobId: string) => {
    applyJobMutation.mutate(jobId, {
      onSuccess: () => {
        toast.success("Applied Successfully");
        setTimeout(() => {
          navigate("/application"); // Fixed redirect path from '/applications' to '/application'
        }, 500);
      },
      onError: (error: any) => {
        const res = error?.response?.data;
        let message = "Something went wrong";
        if (res?.message) {
          message = res.message;
        } else if (res?.errors) {
          const firstKey = Object.keys(res.errors)[0];
          const firstError = res.errors[firstKey];
          if (Array.isArray(firstError)) {
            message = firstError[0];
          }
        }
        toast.error(message);
      },
    });
  };

  const { data: job, isLoading, isError } = useJob(jobId);

  const applications = myApplications?.data?.myApplication || [];
  const hasApplied = applications.some((app) => app.job?.id === jobId);

  if (isLoading) return <FullScreenLoader />;

  if (isError || !job) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">Job Not Found</h2>
        <Link
          to="/jobs"
          className="text-primary hover:underline font-bold mt-2 flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to List
        </Link>
      </div>
    );
  }

  const skillsList = job.skills
    ? job.skills.split(",").map((s) => s.trim())
    : [];

  const formattedSalary =
    job.salaryMin && job.salaryMax
      ? `${formatCurrency(job.salaryMin, job.salaryCurrency)} - ${formatCurrency(
          job.salaryMax,
          job.salaryCurrency
        )}`
      : "Salary not disclosed";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-24 space-y-6 animate-in fade-in duration-300">
      {/* Back Link */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary font-bold transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-base font-semibold text-muted-foreground">
                  <Building className="h-4 w-4 text-slate-400" />
                  <span>{job.company}</span>
                </div>
              </div>
              <div className="bg-primary/5 text-primary dark:bg-primary/20 h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center font-black text-lg border border-primary/10">
                {job.company.substring(0, 2).toUpperCase()}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 border-y border-slate-100 dark:border-slate-800/80 py-4">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 dark:bg-slate-800 dark:border-slate-800 dark:text-slate-300">
                <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                {getEmploymentTypeLabel(job.employmentType)}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/10 text-primary dark:bg-primary/25 dark:text-primary-foreground/90">
                {getExperienceLevelLabel(job.experienceLevel)}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">
                Job Description
              </h3>
              <p className="text-sm font-semibold text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Skills */}
            {skillsList.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl dark:bg-slate-800 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Floating Sidebar */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-6">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 border-b pb-3">
              Job Summary
            </h3>

            {/* Info grid list */}
            <div className="space-y-4 text-xs font-semibold">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                    Location
                  </p>
                  <p className="text-slate-800 dark:text-slate-200">
                    {job.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                    Salary Range
                  </p>
                  <p className="text-slate-800 dark:text-slate-200">
                    {formattedSalary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                    Date Posted
                  </p>
                  <p className="text-slate-800 dark:text-slate-200">
                    {formatDate(job.createdAt)}
                  </p>
                </div>
              </div>

              {job.applicationDeadline && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                      Deadline
                    </p>
                    <p className="text-slate-800 dark:text-slate-200">
                      {formatDate(job.applicationDeadline)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="border-t pt-5 space-y-3">
              {!user && (
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full py-5 rounded-2xl font-bold cursor-pointer"
                >
                  Login to Apply
                </Button>
              )}

              {user?.role === "candidate" && (
                <Button
                  className="w-full py-5 rounded-2xl font-bold cursor-pointer transition-all active:scale-95"
                  onClick={() => handleApply(job.id)}
                  disabled={applyJobMutation.isPending || hasApplied}
                >
                  {applyJobMutation.isPending ? (
                    "Applying..."
                  ) : hasApplied ? (
                    <span className="flex items-center gap-1 justify-center">
                      <CheckCircle className="h-4 w-4" /> Already Applied
                    </span>
                  ) : (
                    "Apply Now"
                  )}
                </Button>
              )}

              {user?.role === "recruiter" && (
                <div className="flex flex-col gap-2.5">
                  <Button
                    onClick={() => navigate(`/jobs/${jobId}/applicants`)}
                    className="w-full py-5 rounded-2xl font-bold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Users className="h-4 w-4" />
                    View Applicants
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="py-5 rounded-2xl font-bold cursor-pointer flex items-center justify-center gap-1 dark:border-slate-800 dark:bg-slate-900"
                      onClick={() => navigate(`/jobs/edit/${job.id}`)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="py-5 rounded-2xl font-bold cursor-pointer flex items-center justify-center gap-1"
                      onClick={() => handleDelete(job.id)}
                      disabled={deleteJobMutation.isPending}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
