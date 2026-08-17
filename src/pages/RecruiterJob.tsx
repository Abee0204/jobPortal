import { useMyJobs } from "@/features/jobs/hooks/useMyJobs";
import FullScreenLoader from "./FullScreenLoader";
import { Link, useNavigate } from "react-router-dom";
import JobCard from "@/features/jobs/components/JobCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, Briefcase } from "lucide-react";

const RecruiterJob = () => {
  const { data: myJobs, isLoading, isError } = useMyJobs();
  const navigate = useNavigate();

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mt-1.5">
          Failed to load your posted jobs. Please try again.
        </p>
      </div>
    );
  }

  const jobsList = myJobs || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-24 space-y-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
            My Job Postings
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1.5">
            Manage your active job postings, check applicants, and edit details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/10 shrink-0">
            {jobsList.length} {jobsList.length === 1 ? "Posting" : "Postings"}
          </div>
          <Button
            onClick={() => navigate("/recruiter/jobs/new")}
            size="sm"
            className="rounded-xl flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Content */}
      {jobsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl dark:border-slate-800/80">
          <Briefcase className="h-12 w-12 text-muted-foreground/60 mb-4" />
          <h3 className="text-xl font-bold">No jobs posted yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Create your first job listing to start receiving applications from
            candidates.
          </p>
          <Button
            onClick={() => navigate("/recruiter/jobs/new")}
            className="mt-6 rounded-xl font-bold cursor-pointer"
          >
            Create First Job
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobsList.map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}/applicants`} className="block">
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterJob;
