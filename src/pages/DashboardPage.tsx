import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useMyApplication } from "@/features/applications/hooks/useMyApplications";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FileCheck,
  Briefcase,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FullScreenLoader from "./FullScreenLoader";

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

  const appsCount = myApplications?.data?.myApplication?.length || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary via-slate-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-100 dark:shadow-none border border-slate-100/10">
        <div className="space-y-2">
          <span className="bg-white/10 text-white border border-white/15 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Candidate Dashboard
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
            Welcome back, {user?.name || "Candidate"}!
          </h1>
          <p className="text-sm text-slate-300 font-semibold max-w-xl">
            Review your application progress and track job listings that match your expertise.
          </p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Applications Stat Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 text-primary p-3 rounded-2xl">
              <FileCheck className="h-5 w-5" />
            </div>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 px-2 py-0.5 rounded-md">
              Submitted
            </span>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-50">
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
              View status tracker <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Find More Jobs CTA Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-emerald-500/10 text-emerald-600 p-3 rounded-2xl">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-slate-50">
              Find More Jobs
            </p>
            <p className="text-xs text-muted-foreground font-semibold mt-1">
              Explore new vacancies that match your career profile.
            </p>
          </div>
          <div className="pt-2">
            <Button
              onClick={() => navigate("/jobs")}
              size="sm"
              className="rounded-xl w-full py-4.5 font-bold cursor-pointer"
            >
              Browse Jobs
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
    </div>
  );
};

export default DashboardPage;
