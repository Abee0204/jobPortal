import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Home, RefreshCw, SearchX } from "lucide-react";

type ErrorPageProps = {
  title?: string;
  message?: string;
  code?: string | number;
};

const ErrorPage = ({ title, message, code }: ErrorPageProps) => {
  const routeError = useRouteError();
  const navigate = useNavigate();

  let errorTitle = title || "Oops! Something went wrong";
  let errorMessage = message || "An unexpected error occurred. Please try again later.";
  let errorCode = code;

  if (isRouteErrorResponse(routeError)) {
    errorCode = routeError.status;
    if (routeError.status === 404) {
      errorTitle = "Page Not Found";
      errorMessage = "Sorry, the page you are looking for doesn't exist or has been moved.";
    } else if (routeError.status === 401) {
      errorTitle = "Unauthorized Access";
      errorMessage = "You must be logged in to view this page.";
    } else if (routeError.status === 500) {
      errorTitle = "Server Error";
      errorMessage = "Our servers encountered an issue. Please try refreshing.";
    } else {
      errorMessage = routeError.statusText || errorMessage;
    }
  } else if (routeError instanceof Error) {
    errorMessage = routeError.message;
  }

  const is404 = errorCode === 404 || errorTitle.includes("404") || errorTitle.includes("Not Found");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-slate-50/70 dark:bg-slate-950">
      <div className="max-w-md w-full bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-100/60 dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-none text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Icon Circle */}
        <div className="mx-auto h-20 w-20 rounded-3xl bg-destructive/10 text-destructive flex items-center justify-center shadow-inner">
          {is404 ? (
            <SearchX className="h-10 w-10 text-destructive" />
          ) : (
            <AlertCircle className="h-10 w-10 text-destructive" />
          )}
        </div>

        {/* Error Details */}
        <div className="space-y-2">
          {errorCode && (
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Error {errorCode}
            </span>
          )}
          <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50 pt-1">
            {errorTitle}
          </h1>
          <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
            {errorMessage}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-2.5">
          <Button
            onClick={() => navigate("/")}
            className="w-full py-5 rounded-2xl font-bold cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="py-4.5 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1 dark:border-slate-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Go Back
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="py-4.5 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1 dark:border-slate-800"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try Again
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;
