import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Sparkles, Briefcase, UserCheck, ShieldCheck, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 md:px-6 py-20 mt-10">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto text-center space-y-12 relative z-10">
        
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/15 text-primary text-xs font-black px-4 py-2 rounded-full shadow-sm animate-bounce dark:bg-primary/20 dark:text-primary-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          The Modern Job Hub
        </div>

        {/* Heading */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-950 dark:text-slate-50 leading-[1.1]">
            Work with the Best.
            <br />
            <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              AI Talent Wanted.
            </span>
          </h1>
          
          {/* Description */}
          <p className="max-w-2xl mx-auto text-base md:text-xl text-muted-foreground font-semibold leading-relaxed">
            Push the boundaries of innovation alongside industry leaders. 
            Connect with premium companies, streamline your recruitment, and make a real impact.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NavLink to="/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-2xl px-8 py-7 text-sm font-black shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer active:scale-95"
            >
              Get Started Now
              <ArrowRight className="h-4 w-4 ml-1.5 shrink-0" />
            </Button>
          </NavLink>

          <NavLink to="/jobs" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-2xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-8 py-7 text-sm font-black dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
            >
              Discover Careers
            </Button>
          </NavLink>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
            <div className="bg-primary/10 text-primary p-3 rounded-2xl">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Top Companies</h3>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              Partnered with elite tech firms and startups leading the AI revolution.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
            <div className="bg-emerald-500/10 text-emerald-600 p-3 rounded-2xl">
              <UserCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Fast Application</h3>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              Apply to your dream jobs with just a single click. No tedious forms.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
            <div className="bg-blue-500/10 text-blue-600 p-3 rounded-2xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Verified Postings</h3>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              Every job listing is manually verified for security and authenticity.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;