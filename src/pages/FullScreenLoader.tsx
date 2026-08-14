import { Loader2 } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-md dark:bg-slate-950/85 z-50 animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-4 bg-white/70 p-8 rounded-3xl border border-slate-100 shadow-xl backdrop-blur-sm dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none max-w-xs w-full text-center">
        <div className="relative flex items-center justify-center">
          {/* Pulsing ring */}
          <div className="absolute h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 animate-ping" />
          {/* Inner icon */}
          <Loader2 className="h-8 w-8 animate-spin text-primary relative z-10" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-black tracking-tight text-primary">
            hireHub
          </h2>
          <p className="text-xs text-muted-foreground font-semibold animate-pulse">
            Loading your workspace...
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;