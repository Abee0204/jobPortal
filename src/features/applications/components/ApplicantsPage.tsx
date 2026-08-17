import { useParams } from "react-router-dom";
import { useMyApplicants } from "../hooks/useMyApplicants";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import FullScreenLoader from "@/pages/FullScreenLoader";
import type { Applicant, ApplicationStatus } from "@/types/application.types";
import { ApplicantCard } from "./ApplicantCard";
import { User } from "lucide-react";

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
            <ApplicantCard
              key={app.id}
              applicant={app}
              onStatusUpdate={handleStatusChange}
              isUpdating={isUpdating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantsPage;
