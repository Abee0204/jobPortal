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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/register.schema";
import { setToken } from "@/utils/token";
import { useRegister } from "@/features/auth/hooks/useRegister";


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
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
  const signUpMutation = useRegister();
  const onSubmit =  (data: RegisterFormData) => {
   signUpMutation.mutate(data ,{
    onSuccess:(response) => {
      setToken(response.token);
      form.reset();
      navigate("/dashboard");
    },
    onError:(error)=>{
      console.log(error);
    },
   })
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...form.register("name")}
              />
              <p className="text-sm text-red-500">
                {form.formState.errors.name?.message}
              </p>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...form.register("email")}
              />
              <FieldDescription>
                We'll use this to contact you.
              </FieldDescription>
              <p className="text-sm text-red-500">
                {form.formState.errors.email?.message}
              </p>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>

              <p className="text-sm text-red-500">
                {form.formState.errors.password?.message}
              </p>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                {...form.register("confirmPassword")}
              />

              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword?.message}
              </p>
            </Field>

            <Field>
              <FieldLabel>Role</FieldLabel>

              <Select
                defaultValue="candidate"
                onValueChange={(value) =>
                  form.setValue("role", value as "candidate" | "recruiter")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="candidate">Candidate</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <FieldDescription className="px-6 text-center mt-4">
                Already have an account? <NavLink to="/login">Log in</NavLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
