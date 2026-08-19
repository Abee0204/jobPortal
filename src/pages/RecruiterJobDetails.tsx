import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useJob } from "@/features/jobs/hooks/useJob";
import { useDeleteJob } from "@/features/jobs/hooks/useDeleteJob";
import FullScreenLoader from "./FullScreenLoader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  getEmploymentTypeLabel,
  getExperienceLevelLabel,
  formatCurrency,
  formatDate,
} from "@/features/jobs/utils/job.helpers";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  ArrowLeft,
  Trash2,
  Edit,
  Users,
  Clock,
  Building,
  AlertTriangle,
  Loader2,
  X,
} from "lucide-react";
import axios from "axios";

const RecruiterJobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: job, isLoading, isError } = useJob(jobId || "");
  const deleteJobMutation = useDeleteJob();

  if (!jobId) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">Job not found</h2>
        <Button
          onClick={() => navigate("/recruiter/jobs")}
          className="mt-4 rounded-xl font-bold"
        >
          Back to My Jobs
        </Button>
      </div>
    );
  }

  const handleConfirmDelete = () => {
    deleteJobMutation.mutate(jobId, {
      onSuccess: () => {
        toast.success("Job deleted successfully", { position: "top-center" });
        setIsDeleteDialogOpen(false);
        navigate("/recruiter/jobs");
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Failed to delete job";
          toast.error(message, { position: "top-center" });
        } else {
          toast.error("Failed to delete job", { position: "top-center" });
        }
      },
    });
  };

  if (isLoading) return <FullScreenLoader />;

  if (isError || !job) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">Job Not Found</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          The requested job posting may have been removed or does not exist.
        </p>
        <Button
          onClick={() => navigate("/recruiter/jobs")}
          className="mt-4 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Jobs
        </Button>
      </div>
    );
  }

  const skillsList = job.skills
    ? job.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const formattedSalary =
    job.salaryMin && job.salaryMax
      ? `${formatCurrency(job.salaryMin, job.salaryCurrency)} - ${formatCurrency(
          job.salaryMax,
          job.salaryCurrency
        )}`
      : "Salary not disclosed";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Back button to My Jobs */}
      <button
        onClick={() => navigate("/recruiter/jobs")}
        className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to My Jobs
      </button>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Job Details */}
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
                {job.company ? job.company.substring(0, 2).toUpperCase() : "JB"}
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

        {/* Right Column: Floating Sidebar Summary & Recruiter Actions */}
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

            {/* Recruiter Actions */}
            <div className="border-t pt-5 space-y-3">
              <h4 className="text-xs font-black uppercase text-muted-foreground tracking-wider mb-2">
                Recruiter Actions
              </h4>
              <div className="flex flex-col gap-2.5">
                <Button
                  onClick={() => navigate(`/jobs/${jobId}/applicants`)}
                  className="w-full py-5 rounded-2xl font-bold cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
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
                    Edit Job
                  </Button>

                  <Button
                    variant="destructive"
                    className="py-5 rounded-2xl font-bold cursor-pointer flex items-center justify-center gap-1"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    disabled={deleteJobMutation.isPending}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <button
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleteJobMutation.isPending}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Delete Job Posting
                </h3>
                <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-slate-100">&quot;{job.title}&quot;</span>? All associated application data will be permanently removed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={deleteJobMutation.isPending}
                className="rounded-xl font-bold cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={deleteJobMutation.isPending}
                className="rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-destructive/20"
              >
                {deleteJobMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterJobDetails;
