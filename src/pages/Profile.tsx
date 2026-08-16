import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Mail, ShieldCheck, Briefcase, ArrowLeft } from "lucide-react";
import FullScreenLoader from "./FullScreenLoader";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { data: user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  if (isLoading) return <FullScreenLoader />;

  if (!user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">User not found</h2>
        <Button onClick={() => navigate("/login")} className="mt-4 rounded-xl font-bold">
          Go to Login
        </Button>
      </div>
    );
  }

  const isRecruiter = user.role === "recruiter";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-24 space-y-6 animate-in fade-in duration-300">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary font-bold transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      {/* Header Profile Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-primary to-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-primary/20 shrink-0">
            {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">
                {user.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15 self-center sm:self-auto">
                <ShieldCheck className="h-3.5 w-3.5" />
                {user.role}
              </span>
            </div>
            <p className="text-sm font-semibold text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        {/* Profile Details List */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl dark:bg-slate-950/30 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">
              Account Role
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
              {user.role} Account
            </p>
          </div>

          <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl dark:bg-slate-950/30 dark:border-slate-800 space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">
              Member Status
            </p>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Active & Verified
            </p>
          </div>
        </div>

        {/* Action Link Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          {isRecruiter ? (
            <Button
              onClick={() => navigate("/recruiter/jobs")}
              className="flex-1 py-5 rounded-2xl font-bold cursor-pointer"
            >
              <Briefcase className="h-4 w-4 mr-1.5" />
              Manage My Jobs
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/application")}
              className="flex-1 py-5 rounded-2xl font-bold cursor-pointer"
            >
              <Briefcase className="h-4 w-4 mr-1.5" />
              View My Applications
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
