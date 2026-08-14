import { useMyApplication } from "@/features/applications/hooks/useMyApplications";
import FullScreenLoader from "./FullScreenLoader";
import { ApplicationCard } from "@/features/applications/components/ApplicationCard";
import { Briefcase, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ApplicationPage = () => {
  const { data, isLoading } = useMyApplication();
  const navigate = useNavigate();

  if (isLoading) return <FullScreenLoader />;

  const applications = data?.data?.myApplication || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-24 space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
            My Applications
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1.5">
            Track and monitor the status of your submitted job applications.
          </p>
        </div>
        <div className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/10 shrink-0 self-start sm:self-auto">
          {applications.length}{" "}
          {applications.length === 1 ? "Application" : "Applications"}
        </div>
      </div>

      {/* Applications list */}
      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl dark:border-slate-800/80">
          <Briefcase className="h-12 w-12 text-muted-foreground/60 mb-4" />
          <h3 className="text-xl font-bold">No applications yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            You haven't applied to any job postings. Search our open roles to
            get started.
          </p>
          <Button
            onClick={() => navigate("/jobs")}
            className="mt-6 rounded-xl font-bold cursor-pointer"
          >
            Find a Job
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationPage;
