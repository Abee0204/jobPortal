import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { removeToken } from "@/utils/token";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";

interface UserProfile {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

interface RecruiterSidebarProps {
  user?: UserProfile | null;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RecruiterSidebar: React.FC<RecruiterSidebarProps> = ({
  user,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    removeToken();
    queryClient.setQueryData(["currentUser"], null);
    toast.success("Logged out successfully", { position: "top-center" });
    navigate("/login");
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/recruiter/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Jobs",
      path: "/recruiter/jobs",
      icon: Briefcase,
    },
    {
      label: "Create Job",
      path: "/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      label: "Profile",
      path: "/recruiter/profile",
      icon: User,
    },
  ];

  const getInitials = (name?: string) => {
    if (!name) return "R";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    /* Desktop Sidebar Navigation Only (Disabled on Mobile) */
    <aside
      className={`hidden lg:flex fixed top-24 left-4 bottom-6 z-30 flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl transition-all duration-300 ease-in-out shadow-lg ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
        <div
          className={`flex items-center gap-3 overflow-hidden transition-all duration-200 ${
            isCollapsed ? "justify-center w-full" : ""
          }`}
        >
          <span className="bg-primary text-primary-foreground h-9 w-9 rounded-2xl flex items-center justify-center font-black text-lg shadow-md shadow-primary/20 shrink-0">
            r
          </span>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-tight">
                Recruiter
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary uppercase tracking-widest mt-0.5">
                <Building2 className="h-2.5 w-2.5" /> Workspace
              </span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center py-2 border-b border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Expand Sidebar"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={isCollapsed ? item.label : undefined}
            className={({ isActive }) =>
              `group relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isCollapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-100"
              }`
            }
          >
            <item.icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            {!isCollapsed && <span>{item.label}</span>}

            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 rounded-b-3xl">
        <div
          className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
            isCollapsed
              ? "justify-center"
              : "bg-white dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/50 shadow-2xs"
          }`}
        >
          <div
            className="h-10 w-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm ring-2 ring-primary/20"
            title={isCollapsed ? user?.name || "Recruiter" : undefined}
          >
            {getInitials(user?.name)}
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate leading-tight">
                {user?.name || "Recruiter"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {user?.email || "recruiter@hirehub.com"}
              </p>
            </div>
          )}

          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>

        {isCollapsed && (
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex justify-center p-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </aside>
  );
};
