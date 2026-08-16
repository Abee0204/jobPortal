import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import FullScreenLoader from "@/pages/FullScreenLoader";
import { removeToken } from "@/utils/token";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  FileCheck,
  User,
  LogOut,
  Menu,
  X,
  PlusCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  const { data: user, isLoading, isError } = useCurrentUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">
          Something went wrong loading workspace
        </h2>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl font-bold"
        >
          Retry
        </Button>
      </div>
    );
  }

  const isCandidate = user?.role === "candidate";
  const isRecruiter = user?.role === "recruiter";

  const handleLogout = () => {
    removeToken();
    queryClient.setQueryData(["currentUser"], null);
    toast.success("Logged out successfully", { position: "top-center" });
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all ${
      isActive
        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
        : "text-muted-foreground hover:text-slate-900 hover:bg-slate-100 dark:hover:text-slate-100 dark:hover:bg-slate-800/60"
    }`;

  return (
    <div className="min-h-screen flex bg-slate-50/60 dark:bg-slate-950">
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-100 p-5 flex flex-col justify-between shadow-xl shadow-slate-200/30 dark:bg-slate-900 dark:border-slate-800 transition-transform duration-300 md:translate-x-0 shrink-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2">
            <NavLink
              to="/"
              className="text-xl font-black tracking-tight text-primary flex items-center gap-2"
            >
              <span className="bg-primary text-primary-foreground h-8 w-8 rounded-xl flex items-center justify-center font-black text-lg shadow-sm">
                h
              </span>
              hireHub
            </NavLink>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 text-muted-foreground hover:bg-slate-100 rounded-lg md:hidden dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Badge */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 dark:bg-slate-950/40 dark:border-slate-800/80 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary font-black flex items-center justify-center text-sm shrink-0">
              {user?.name?.substring(0, 2).toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {user?.name}
              </p>
              <span className="text-[10px] font-extrabold uppercase text-primary tracking-wider">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 pt-2">
            <p className="px-3 text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">
              Menu
            </p>

            <NavLink
              to="/dashboard"
              onClick={() => setIsMobileOpen(false)}
              className={navLinkClass}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/jobs"
              onClick={() => setIsMobileOpen(false)}
              className={navLinkClass}
            >
              <Briefcase className="h-4 w-4 shrink-0" />
              <span>Browse Jobs</span>
            </NavLink>

            <NavLink
              to="/application"
              onClick={() => setIsMobileOpen(false)}
              className={navLinkClass}
            >
              <FileCheck className="h-4 w-4 shrink-0" />
              <span>My Applications</span>
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => setIsMobileOpen(false)}
              className={navLinkClass}
            >
              <User className="h-4 w-4 shrink-0" />
              <span>Profile</span>
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/10 rounded-2xl transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3.5 flex items-center justify-between dark:bg-slate-900/80 dark:border-slate-800 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="capitalize">{user?.role}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-900 dark:text-slate-100 font-bold">
                Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-xs">
              {user?.name?.substring(0, 2).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
