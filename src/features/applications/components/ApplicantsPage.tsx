import { useParams } from "react-router-dom";
import { useMyApplicants } from "../hooks/useMyApplicants";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import FullScreenLoader from "@/pages/FullScreenLoader";
import type { Applicant, ApplicationStatus } from "@/types/application.types";
import { Button } from "@/components/ui/button";
import { Mail, User, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

const getStatusStyles = (status: ApplicationStatus) => {
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

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const { data, isLoading } = useMyApplicants(jobId!);
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus(jobId!);

  if (isLoading) return <FullScreenLoader />;

  const applications = data?.data?.allApplications || [];

  const handleStatusChange = (
    applicationId: number,
    status: ApplicationStatus
  ) => {
    updateStatus({ applicationId, status });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Applicants</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and update the status of candidates who applied for this
            role.
          </p>
        </div>
        <div className="bg-muted px-3 py-1.5 rounded-full text-xs font-semibold">
          {applications.length}{" "}
          {applications.length === 1 ? "Applicant" : "Applicants"}
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 text-center">
          <User className="h-10 w-10 text-muted-foreground/60 mb-3" />
          <h3 className="text-lg font-medium">No applications yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Candidates who apply for this job will appear here. Share your job
            posting to get more reach!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app: Applicant) => (
            <div
              key={app.id}
              className="flex flex-col md:flex-row md:items-center justify-between border rounded-xl p-5 shadow-sm bg-card transition-all hover:shadow-md gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="bg-primary/10 text-primary p-2 rounded-lg">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base leading-none">
                      {app.user?.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{app.user?.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    Current Status:
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 font-semibold rounded-full border ${getStatusStyles(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="w-full md:w-auto h-px bg-border md:hidden my-1" />

                <div className="flex items-center gap-2 w-full md:w-auto">
                  {app.status !== "REVIEWING" &&
                    app.status !== "ACCEPTED" &&
                    app.status !== "REJECTED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-50 dark:border-blue-900/40 dark:text-blue-400 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 flex-1 md:flex-initial cursor-pointer"
                        onClick={() => handleStatusChange(app.id, "REVIEWING")}
                        disabled={isUpdating}
                      >
                        <ArrowRight className="h-3.5 w-3.5 mr-1" />
                        Review
                      </Button>
                    )}

                  {app.status !== "ACCEPTED" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 text-green-700 bg-green-50/50 hover:bg-green-50 dark:border-green-900/40 dark:text-green-400 dark:bg-green-950/20 dark:hover:bg-green-950/40 flex-1 md:flex-initial cursor-pointer"
                      onClick={() => handleStatusChange(app.id, "ACCEPTED")}
                      disabled={isUpdating}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Accept
                    </Button>
                  )}

                  {app.status !== "REJECTED" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 md:flex-initial cursor-pointer"
                      onClick={() => handleStatusChange(app.id, "REJECTED")}
                      disabled={isUpdating}
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantsPage;
