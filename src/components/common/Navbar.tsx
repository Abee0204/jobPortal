import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { removeToken } from "@/utils/token";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const { data: user, isLoading } = useCurrentUser();

  const isCandidate = user?.role === "candidate";
  const isRecruiter = user?.role === "recruiter";

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setVisible(true);
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
        setIsOpen(false); // close mobile menu on scroll down
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    removeToken();
    queryClient.setQueryData(["currentUser"], null);
    toast.success("Logged out successfully", {
      position: "top-center",
    });
    setIsOpen(false);
    navigate("/login");
  };

  if (isLoading) return null;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-1.5 text-sm font-semibold transition-all duration-200 rounded-lg ${
      isActive
        ? "text-primary bg-primary/5 dark:bg-primary/20"
        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex w-full items-center px-4 py-3 text-base font-semibold transition-all rounded-xl ${
      isActive
        ? "text-primary bg-primary/5 dark:bg-primary/20"
        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 flex justify-center transition-all duration-300 px-4 md:px-0 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <nav className="flex w-full max-w-5xl flex-col rounded-3xl bg-white/95 border border-slate-100/80 px-6 py-3.5 shadow-xl shadow-slate-200/40 backdrop-blur-md dark:bg-slate-900/95 dark:border-slate-800/80 dark:shadow-none">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-black tracking-tight text-primary flex items-center gap-1.5"
          >
            <span className="bg-primary text-primary-foreground h-7 w-7 rounded-lg flex items-center justify-center font-black text-lg">
              h
            </span>
            hireHub
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {isCandidate && (
                  <>
                    <NavLink to="/jobs" className={navLinkClass}>
                      Jobs
                    </NavLink>
                    <NavLink to="/application" className={navLinkClass}>
                      My Applications
                    </NavLink>
                  </>
                )}
                {isRecruiter && (
                  <>
                    <NavLink to="/recruiter/jobs" className={navLinkClass}>
                      My Jobs
                    </NavLink>
                    <NavLink to="/recruiter/jobs/new" className={navLinkClass}>
                      Create Job
                    </NavLink>
                  </>
                )}

                <NavLink to="/profile" className={navLinkClass}>
                  Profile
                </NavLink>

                <Button
                  onClick={handleLogout}
                  size="sm"
                  className="rounded-full px-5 cursor-pointer font-semibold shadow-sm ml-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/jobs" className={navLinkClass}>
                  Jobs
                </NavLink>

                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>

                <NavLink to="/register" className="ml-2">
                  <Button className="rounded-full px-5 cursor-pointer font-semibold shadow-sm">
                    Get Started
                  </Button>
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
            {user ? (
              <>
                <div className="px-4 py-2 flex items-center gap-2.5 bg-muted/30 rounded-xl mb-1">
                  <div className="bg-primary/10 text-primary p-1.5 rounded-lg">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                      {user.role} Account
                    </p>
                  </div>
                </div>

                {isCandidate && (
                  <>
                    <NavLink
                      to="/jobs"
                      onClick={() => setIsOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      Jobs
                    </NavLink>
                    <NavLink
                      to="/application"
                      onClick={() => setIsOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      My Applications
                    </NavLink>
                  </>
                )}
                {isRecruiter && (
                  <>
                    <NavLink
                      to="/recruiter/jobs"
                      onClick={() => setIsOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      My Jobs
                    </NavLink>
                    <NavLink
                      to="/recruiter/jobs/new"
                      onClick={() => setIsOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      Create Job
                    </NavLink>
                  </>
                )}

                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className={mobileNavLinkClass}
                >
                  Profile
                </NavLink>

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                <Button
                  onClick={handleLogout}
                  className="w-full rounded-xl py-5 cursor-pointer font-semibold"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  to="/jobs"
                  onClick={() => setIsOpen(false)}
                  className={mobileNavLinkClass}
                >
                  Jobs
                </NavLink>

                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={mobileNavLinkClass}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-2"
                >
                  <Button className="w-full rounded-xl py-5 cursor-pointer font-semibold">
                    Get Started
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
