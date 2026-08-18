import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  role?: string;
}

const Footer: React.FC<FooterProps> = ({ role }) => {
  const navLinks =
    role === "candidate"
      ? [
          { label: "Jobs", path: "/jobs" },
          { label: "Applications", path: "/application" },
          { label: "Profile", path: "/profile" },
        ]
      : role === "recruiter"
      ? [
          { label: "Dashboard", path: "/recruiter/dashboard" },
          { label: "My Jobs", path: "/recruiter/jobs" },
          { label: "Profile", path: "/recruiter/profile" },
        ]
      : [
          { label: "Jobs", path: "/jobs" },
          { label: "Login", path: "/login" },
          { label: "Register", path: "/register" },
        ];

  return (
    <footer className="w-full bg-white border-t border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="md:col-span-6 space-y-4">
            <Link
              to="/"
              className="text-2xl font-black tracking-tight text-primary flex items-center gap-2.5"
            >
              <span className="bg-primary text-primary-foreground h-9 w-9 rounded-xl flex items-center justify-center font-black text-sm shadow-md shadow-primary/20">
                HH
              </span>
              <span>hireHub</span>
            </Link>
            <p className="text-sm font-medium text-muted-foreground max-w-sm leading-relaxed">
              Empowering tech professionals and hiring managers with streamlined career matching, automated tracking, and talent discovery.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 hover:text-primary hover:bg-primary/5 hover:border-primary/20 dark:bg-slate-800 dark:border-slate-700/60 dark:text-slate-300 dark:hover:text-primary transition-all cursor-pointer"
                aria-label="GitHub"
              >
                {/* <Github className="h-4 w-4" /> */}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 hover:text-primary hover:bg-primary/5 hover:border-primary/20 dark:bg-slate-800 dark:border-slate-700/60 dark:text-slate-300 dark:hover:text-primary transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                {/* <Linkedin className="h-4 w-4" /> */}
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 hover:text-primary hover:bg-primary/5 hover:border-primary/20 dark:bg-slate-800 dark:border-slate-700/60 dark:text-slate-300 dark:hover:text-primary transition-all cursor-pointer"
                aria-label="Twitter"
              >
                {/* <Twitter className="h-4 w-4" /> */}
              </a>
            </div>
          </div>

          {/* Role-based Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-muted-foreground">
          <p>© {new Date().getFullYear()} HireHub Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
