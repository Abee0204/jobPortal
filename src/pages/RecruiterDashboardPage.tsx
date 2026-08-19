import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useMyJobs } from "@/features/jobs/hooks/useMyJobs";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  User,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FullScreenLoader from "./FullScreenLoader";
import JobCard from "@/features/jobs/components/JobCard";

const RecruiterDashboardPage = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: myJobs, isLoading: isJobsLoading } = useMyJobs();
  const navigate = useNavigate();

  if (isUserLoading || isJobsLoading) {
    return <FullScreenLoader />;
  }

  const jobsList = myJobs || [];
  const jobsCount = jobsList.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary via-slate-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-100 dark:shadow-none border border-slate-100/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/10 text-white border border-white/15 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">
              <Building2 className="h-3 w-3" /> Recruiter Control Center
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
              Welcome back, {user?.name || "Recruiter"}!
            </h1>
            <p className="text-sm text-slate-300 font-semibold max-w-xl">
              Here's what is happening with your active job postings and candidate lists today.
            </p>
          </div>

          <Button
            onClick={() => navigate("/recruiter/jobs/new")}
            size="lg"
            className="rounded-2xl font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-md cursor-pointer shrink-0"
          >
            <PlusCircle className="h-4 w-4 mr-1.5 text-primary" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Active Openings Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 text-primary p-3 rounded-2xl">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> Active
            </span>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-50">
              {jobsCount}
            </p>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              Active Job Openings
            </p>
          </div>
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80 flex items-center justify-between">
            <Link
              to="/recruiter/jobs"
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              Manage postings <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Create Job CTA Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-blue-500/10 text-blue-600 p-3 rounded-2xl">
              <PlusCircle className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-slate-50">
              Post a New Role
            </p>
            <p className="text-xs text-muted-foreground font-semibold mt-1">
              Publish a new position to hire from our talent pool.
            </p>
          </div>
          <div className="pt-2">
            <Button
              onClick={() => navigate("/recruiter/jobs/new")}
              size="sm"
              className="rounded-xl w-full py-4.5 font-bold cursor-pointer"
            >
              Create Posting
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-purple-500/10 text-purple-600 p-3 rounded-2xl">
              <User className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
              {user?.role}
            </span>
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-slate-50 truncate">
              {user?.email}
            </p>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              Email Identity
            </p>
          </div>
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80">
            <Link
              to="/profile"
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              Verify profile details <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recruiter Recent Job Openings Preview */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
            My Posted Jobs
          </h2>
          <Link
            to="/recruiter/jobs"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            View All ({jobsCount}) <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {jobsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-100 rounded-3xl text-center dark:border-slate-800">
            <Briefcase className="h-10 w-10 text-muted-foreground/60 mb-3" />
            <h3 className="text-base font-bold">No active job postings</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Click the button below to create your first job posting.
            </p>
            <Button
              onClick={() => navigate("/recruiter/jobs/new")}
              size="sm"
              className="mt-4 rounded-xl font-bold cursor-pointer"
            >
              Post First Job
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobsList.slice(0, 4).map((job) => (
              <Link key={job.id} to={`/recruiter/jobs/${job.id}`} className="block">
                <JobCard job={job} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
