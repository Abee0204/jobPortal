import { type CreateJobData } from "../schemas/job.schema";
import { CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createJobSchema,
  type CreateJobFormInput,
} from "../schemas/job.schema";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useJob } from "../hooks/useJob";
import { useUpdateJob } from "../hooks/useUpdateJob";

export function EditJobForm({ jobId }: { jobId: string }) {
 if (!jobId) return <h1>Invalid Job</h1>;

  const form = useForm<CreateJobFormInput, unknown, CreateJobData>({
    resolver: zodResolver(createJobSchema),
  });

  const { data: job, isLoading } = useJob(jobId);

  const navigate = useNavigate();

  const updateJobMutation = useUpdateJob();

  const onSubmit = (data: CreateJobData) => {
    updateJobMutation.mutate(
      { jobId, data },
      {
        onSuccess: () => {
          toast.success("Job updated successfully");
          navigate("/jobs");
        },
        onError: (error: any) => {
          const res = error?.response?.data;

          let message = "Something went wrong";

          if (res?.message) {
            message = res.message;
          } else if (res?.errors) {
            const firstKey = Object.keys(res.errors)[0];
            const firstError = res.errors[firstKey];

            if (Array.isArray(firstError)) {
              message = firstError[0];
            }
          }

          toast.error(message);
        },
      },
    );
  };

  useEffect(() => {
    if (job) {
      form.reset({
        ...job,
        skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills,
        applicationDeadline: job.applicationDeadline
          ? job.applicationDeadline.split("T")[0]
          : null,
      });
    }
  }, [job]);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <CardContent>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Job Title</FieldLabel>

            <Input
              id="title"
              placeholder="Frontend Developer"
              {...form.register("title")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.title?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="company">Company</FieldLabel>

            <Input
              id="company"
              placeholder="Google"
              {...form.register("company")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.company?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>

            <Textarea
              id="description"
              placeholder="Describe the job..."
              {...form.register("description")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.description?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>

            <Input
              id="location"
              placeholder="Remote"
              {...form.register("location")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.location?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel>Employment Type</FieldLabel>

            <Select
              value={form.watch("employmentType")}
              onValueChange={(value) =>
                form.setValue(
                  "employmentType",
                  value as CreateJobData["employmentType"],
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="FULL_TIME">Full Time</SelectItem>
                <SelectItem value="PART_TIME">Part Time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-red-500">
              {form.formState.errors.employmentType?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel>Experience Level</FieldLabel>

            <Select
              value={form.watch("experienceLevel")}
              onValueChange={(value) =>
                form.setValue(
                  "experienceLevel",
                  value as CreateJobData["experienceLevel"],
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="FRESHER">Fresher</SelectItem>
                <SelectItem value="MID">Mid</SelectItem>
                <SelectItem value="SENIOR">Senior</SelectItem>
                <SelectItem value="LEAD">Lead</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-red-500">
              {form.formState.errors.experienceLevel?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="skills">Skills</FieldLabel>

            <Input
              id="skills"
              placeholder="React, TypeScript, Tailwind CSS"
              {...form.register("skills")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.skills?.message}
            </p>
          </Field>
          <Field>
            <FieldLabel htmlFor="salaryMin">Minimum Salary</FieldLabel>

            <Input
              id="salaryMin"
              type="number"
              placeholder="50000"
              {...form.register("salaryMin")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.salaryMin?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="salaryMax">Maximum Salary</FieldLabel>

            <Input
              id="salaryMax"
              type="number"
              placeholder="80000"
              {...form.register("salaryMax")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.salaryMax?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="salaryCurrency">Currency</FieldLabel>

            <Input
              id="salaryCurrency"
              placeholder="INR"
              {...form.register("salaryCurrency")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.salaryCurrency?.message}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="applicationDeadline">
              Application Deadline
            </FieldLabel>

            <Input
              id="applicationDeadline"
              type="date"
              {...form.register("applicationDeadline")}
            />
            <p className="text-sm text-red-500">
              {form.formState.errors.applicationDeadline?.message}
            </p>
          </Field>
        </FieldGroup>
        <Button
          type="submit"
          className="mt-6 w-full"
          disabled={updateJobMutation.isPending}
        >
          {updateJobMutation.isPending ? "Updating..." : "Update Job"}
        </Button>
      </form>
    </CardContent>
  );
}
