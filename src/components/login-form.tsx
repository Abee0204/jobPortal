import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import axios from "axios";

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
  const loginMutation = useLogin();
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setToken(response.token);
        form.reset();
        toast.success("Login successful", {
          position: "top-center",
        });
        navigate("/dashboard");
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...form.register("email")}
                />
                <p className="text-sm text-red-500">
                  {form.formState.errors.email?.message}
                </p>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                />
                <p className="text-sm text-red-500">
                  {form.formState.errors.password?.message}
                </p>
              </Field>
              <Field>
                <Button type="submit" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? "Logging in...." : "Login"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <NavLink to={"/register"}>Sign up</NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
