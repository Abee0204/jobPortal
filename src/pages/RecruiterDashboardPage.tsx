import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useMyJobs } from "@/features/jobs/hooks/useMyJobs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Briefcase,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  UserCheck,
  Building2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FullScreenLoader from "./FullScreenLoader";
import JobCard from "@/features/jobs/components/JobCard";

const RecruiterDashboardPage = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: myJobs, isLoading: isJobsLoading } = useMyJobs();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "candidate") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (isUserLoading || isJobsLoading) {
    return <FullScreenLoader />;
  }

  const jobsList = myJobs || [];
  const jobsCount = jobsList.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-24 space-y-8 animate-in fade-in duration-300">
      {/* Recruiter Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/10 text-white border border-white/15 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">
              <Building2 className="h-3 w-3" /> Recruiter Control Center
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
              Welcome, {user?.name || "Recruiter"}!
            </h1>
            <p className="text-sm text-slate-300 font-semibold max-w-xl">
              Manage your job openings, track candidate applications, and recruit top talent for your team.
            </p>
          </div>

          <Button
            onClick={() => navigate("/recruiter/jobs/new")}
            size="lg"
            className="rounded-2xl font-bold bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-100 dark:text-slate-900 shadow-md cursor-pointer shrink-0"
          >
            <PlusCircle className="h-4 w-4 mr-1.5 text-primary" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Recruiter Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Active Openings Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 text-primary p-3 rounded-2xl">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Live
            </span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 dark:text-slate-50">
              {jobsCount}
            </p>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              Active Job Postings
            </p>
          </div>
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80">
            <Link
              to="/recruiter/jobs"
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              View all listings <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Post Job CTA Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-emerald-500/10 text-emerald-600 p-3 rounded-2xl">
              <PlusCircle className="h-5 w-5" />
            </div>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 px-2.5 py-1 rounded-full">
              Hiring
            </span>
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-slate-50">
              Create Job Listing
            </p>
            <p className="text-xs text-muted-foreground font-semibold mt-1">
              Publish a new position to start receiving applications immediately.
            </p>
          </div>
          <div className="pt-2">
            <Button
              onClick={() => navigate("/recruiter/jobs/new")}
              size="sm"
              className="rounded-xl w-full py-4.5 font-bold cursor-pointer"
            >
              Create New Job
            </Button>
          </div>
        </div>

        {/* Recruiter Profile Info Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-purple-500/10 text-purple-600 p-3 rounded-2xl">
              <UserCheck className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
              Recruiter
            </span>
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-slate-50 truncate">
              {user?.email}
            </p>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              Account Identity
            </p>
          </div>
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80">
            <Link
              to="/recruiter/profile"
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              Recruiter profile details <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recruiter Recent Job Postings Overview */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Recent Job Listings
          </h2>
          <Link
            to="/recruiter/jobs"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            See All ({jobsCount}) <ArrowRight className="h-3.5 w-3.5" />
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
              className="mt-4 rounded-xl font-bold"
            >
              Post First Job
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobsList.slice(0, 4).map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block">
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
