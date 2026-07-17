import { LoaderCircle } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#ffe169]">
      <div className="flex flex-col items-center gap-6 ">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />

        <div className="text-center">
          <h2 className="text-xl font-semibold">HireHub</h2>
          <p className="mt-1 text-sm text-muted-foreground animate-pulse">
            Loading your workspace...
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;