import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  type LoginFormData,
  loginSchema,
} from "@/features/auth/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { setToken } from "@/utils/token";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import loginIllustration from "@/assets/img/login_illustration.png";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useLogin();
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response: any) => {
        setToken(response.token);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        toast.success("Login successful", {
          position: "top-center",
        });
        const userRole = response?.data?.data?.user?.role || response?.user?.role;
        if (userRole === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/dashboard");
        }
      },

      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || "Something went wrong";
          toast.error(message, {
            position: "top-center",
          });
          return;
        }
      },
    });
  };

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12",
        className
      )}
      {...props}
    >
      {/* Left Side SaaS Illustration Panel */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-slate-900 via-primary/95 to-slate-900 text-white p-8 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-wide backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            <span>Welcome to HireHub</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight leading-tight">
            Connecting Top Talent with Leading Tech Companies.
          </h2>

          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Log in to manage applications, explore open positions, and track recruiter responses in real-time.
          </p>
        </div>

        {/* Vector Illustration */}
        <div className="my-6 relative z-10 flex items-center justify-center p-2">
          <img
            src= {loginIllustration}            
            alt="Login Illustration"
            className="w-full max-w-[220px] h-auto drop-shadow-md object-contain"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-3 text-xs font-semibold text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Secure authentication with encrypted credentials.</span>
        </div>
      </div>

      {/* Right Side Form Panel */}
      <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
            Sign In
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
            Enter your credentials below to access your account.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
              {...form.register("email")}
            />
            {form.formState.errors.email?.message && (
              <p className="text-xs font-semibold text-destructive mt-1">
                {form.formState.errors.email?.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                Password
              </label>
              <a
                href="#"
                className="text-xs font-bold text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
              {...form.register("password")}
            />
            {form.formState.errors.password?.message && (
              <p className="text-xs font-semibold text-destructive mt-1">
                {form.formState.errors.password?.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-11 rounded-xl font-bold text-sm shadow-md shadow-primary/20 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {loginMutation.isPending ? (
              <span>Logging in...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          {/* Footer Link */}
          <div className="pt-2 text-center text-xs font-semibold text-muted-foreground">
            Don&apos;t have an account?{" "}
            <NavLink
              to="/register"
              className="font-bold text-primary hover:underline ml-1"
            >
              Create Account
            </NavLink>
          </div>
        </form>
      </div>
     </div>
  );
}
