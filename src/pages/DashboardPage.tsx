import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useMyApplication } from "@/features/applications/hooks/useMyApplications";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FileCheck,
  Briefcase,
  User,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FullScreenLoader from "./FullScreenLoader";
import { ApplicationCard } from "@/features/applications/components/ApplicationCard";

const DashboardPage = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: myApplications, isLoading: isAppsLoading } = useMyApplication();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate("/recruiter/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (isUserLoading || isAppsLoading) {
    return <FullScreenLoader />;
  }

  const applicationsList = myApplications?.data?.myApplication || [];
  const appsCount = applicationsList.length;

  const acceptedCount = applicationsList.filter(
    (app) => app.status === "ACCEPTED"
  ).length;

  const pendingCount = applicationsList.filter(
    (app) => app.status === "PENDING" || app.status === "REVIEWING"
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-24 space-y-8 animate-in fade-in duration-300">
      {/* Candidate Banner */}
      <div className="bg-gradient-to-r from-primary via-slate-900 to-primary text-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-100 dark:shadow-none border border-slate-100/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-white/10 text-white border border-white/15 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Candidate Portal
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
              Welcome back, {user?.name || "Candidate"}!
            </h1>
            <p className="text-sm text-slate-300 font-semibold max-w-xl">
              Track your active job applications, review responses from hiring managers, and discover new openings.
            </p>
          </div>

          <Button
            onClick={() => navigate("/jobs")}
            size="lg"
            className="rounded-2xl font-bold bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-100 dark:text-slate-900 shadow-md cursor-pointer shrink-0"
          >
            <Search className="h-4 w-4 mr-1.5 text-primary" />
            Explore Jobs
          </Button>
        </div>
      </div>

      {/* Candidate Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Applications */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 text-primary p-3 rounded-2xl">
              <FileCheck className="h-5 w-5" />
            </div>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 px-2.5 py-1 rounded-full">
              Total
            </span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 dark:text-slate-50">
              {appsCount}
            </p>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              Applied Opportunities
            </p>
          </div>
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80">
            <Link
              to="/application"
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              Manage applications <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Pending & Under Review */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-yellow-500/10 text-yellow-600 p-3 rounded-2xl">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-xs text-yellow-600 font-bold bg-yellow-50 dark:bg-yellow-950/30 dark:text-yellow-400 px-2.5 py-1 rounded-full">
              In Review
            </span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 dark:text-slate-50">
              {pendingCount}
            </p>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              Pending / Under Review
            </p>
          </div>
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80">
            <Link
              to="/application"
              className="text-xs text-yellow-600 dark:text-yellow-400 hover:underline font-bold flex items-center gap-1"
            >
              Check status <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Accepted Applications */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-emerald-500/10 text-emerald-600 p-3 rounded-2xl">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2.5 py-1 rounded-full">
              Accepted
            </span>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900 dark:text-slate-50">
              {acceptedCount}
            </p>
            <p className="text-xs text-muted-foreground font-bold mt-0.5">
              Accepted Applications
            </p>
          </div>
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80">
            <Link
              to="/application"
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1"
            >
              View accepted <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Candidate Applications Preview */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Recent Applications
          </h2>
          <Link
            to="/application"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            View All ({appsCount}) <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {applicationsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-100 rounded-3xl text-center dark:border-slate-800">
            <Briefcase className="h-10 w-10 text-muted-foreground/60 mb-3" />
            <h3 className="text-base font-bold">No job applications yet</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Explore available opportunities and submit your first application.
            </p>
            <Button
              onClick={() => navigate("/jobs")}
              size="sm"
              className="mt-4 rounded-xl font-bold"
            >
              Browse Open Jobs
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {applicationsList.slice(0, 3).map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
