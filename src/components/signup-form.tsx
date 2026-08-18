import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/register.schema";
import { setToken } from "@/utils/token";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User, Mail, Lock, Briefcase, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import  signupillustration from "@/assets/img/signup_illustration.jpg";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "candidate",
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const signUpMutation = useRegister();
  const onSubmit = (data: RegisterFormData) => {
    signUpMutation.mutate(data, {
      onSuccess: (response: any) => {
        setToken(response.token);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        toast.success("Registration successful", {
          position: "top-center",
        });
        const userRole = data.role || response?.data?.user?.role;
        if (userRole === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/dashboard");
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? "Something went wrong", {
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
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 -mt-12 -ml-12 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-wide backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            <span>Join HireHub Today</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight leading-tight">
            Start Your Journey with Next-Gen Career Matching.
          </h2>

          <div className="space-y-3 pt-2 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Tailored job recommendations for candidates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Streamlined candidate tracking for recruiters</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Real-time status updates and notifications</span>
            </div>
          </div>
        </div>

        {/* Vector Illustration */}
        <div className="my-6 relative z-10 flex items-center justify-center p-2">
          <img
            src={signupillustration}
            alt="Signup Illustration"
            className="w-full max-w-[220px] h-auto drop-shadow-md object-contain"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 text-xs font-semibold text-slate-400">
          By signing up, you agree to our Terms and Privacy Policy.
        </div>
      </div>

      {/* Right Side Form Panel */}
      <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
            Create an Account
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
            Fill in your details below to set up your profile.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="h-10 sm:h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
              {...form.register("name")}
            />
            {form.formState.errors.name?.message && (
              <p className="text-xs font-semibold text-destructive mt-0.5">
                {form.formState.errors.name?.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
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
              className="h-10 sm:h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
              {...form.register("email")}
            />
            {form.formState.errors.email?.message && (
              <p className="text-xs font-semibold text-destructive mt-0.5">
                {form.formState.errors.email?.message}
              </p>
            )}
          </div>

          {/* Passwords Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-10 sm:h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
                {...form.register("password")}
              />
              {form.formState.errors.password?.message && (
                <p className="text-xs font-semibold text-destructive mt-0.5">
                  {form.formState.errors.password?.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="h-10 sm:h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm focus-visible:ring-primary"
                {...form.register("confirmPassword")}
              />
              {form.formState.errors.confirmPassword?.message && (
                <p className="text-xs font-semibold text-destructive mt-0.5">
                  {form.formState.errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
              I am joining as a
            </label>
            <Select
              defaultValue="candidate"
              onValueChange={(value) =>
                form.setValue("role", value as "candidate" | "recruiter")
              }
            >
              <SelectTrigger className="h-10 sm:h-11 rounded-xl bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-sm">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="candidate">Candidate (Job Seeker)</SelectItem>
                <SelectItem value="recruiter">Recruiter (Employer)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={signUpMutation.isPending}
            className="w-full h-11 rounded-xl font-bold text-sm shadow-md shadow-primary/20 transition-all cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
          >
            {signUpMutation.isPending ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          {/* Footer Link */}
          <div className="pt-2 text-center text-xs font-semibold text-muted-foreground">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-bold text-primary hover:underline ml-1"
            >
              Log in
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
