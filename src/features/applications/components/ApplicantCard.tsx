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

type ApplicantCardProps = {
  applicant: Applicant;
  onStatusUpdate: (applicationId: number, status: ApplicationStatus) => void;
  isUpdating: boolean;
};

export const ApplicantCard = ({
  applicant,
  onStatusUpdate,
  isUpdating,
}: ApplicantCardProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between border rounded-xl p-5 shadow-sm bg-card transition-all hover:shadow-md gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 text-primary p-2 rounded-lg">
            <User className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-base leading-none">
              {applicant.user?.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <Mail className="h-3.5 w-3.5" />
              <span>{applicant.user?.email}</span>
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
              applicant.status
            )}`}
          >
            {applicant.status}
          </span>
        </div>

        <div className="w-full md:w-auto h-px bg-border md:hidden my-1" />

        <div className="flex items-center gap-2 w-full md:w-auto">
          {applicant.status !== "REVIEWING" &&
            applicant.status !== "ACCEPTED" &&
            applicant.status !== "REJECTED" && (
              <Button
                size="sm"
                variant="outline"
                className="border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-50 dark:border-blue-900/40 dark:text-blue-400 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 flex-1 md:flex-initial cursor-pointer"
                onClick={() => onStatusUpdate(applicant.id, "REVIEWING")}
                disabled={isUpdating}
              >
                <ArrowRight className="h-3.5 w-3.5 mr-1" />
                Review
              </Button>
            )}

          {applicant.status !== "ACCEPTED" && (
            <Button
              size="sm"
              variant="outline"
              className="border-green-200 text-green-700 bg-green-50/50 hover:bg-green-50 dark:border-green-900/40 dark:text-green-400 dark:bg-green-950/20 dark:hover:bg-green-950/40 flex-1 md:flex-initial cursor-pointer"
              onClick={() => onStatusUpdate(applicant.id, "ACCEPTED")}
              disabled={isUpdating}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Accept
            </Button>
          )}

          {applicant.status !== "REJECTED" && (
            <Button
              size="sm"
              variant="destructive"
              className="flex-1 md:flex-initial cursor-pointer"
              onClick={() => onStatusUpdate(applicant.id, "REJECTED")}
              disabled={isUpdating}
            >
              <XCircle className="h-3.5 w-3.5 mr-1" />
              Reject
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
