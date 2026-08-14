import { type CreateJobData } from "../schemas/job.schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ArrowLeft, Edit2 } from "lucide-react";
import FullScreenLoader from "@/pages/FullScreenLoader";

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
          navigate(`/jobs/${jobId}`); // Redirect back to the job details page
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
      }
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

  if (isLoading) return <FullScreenLoader />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-24 animate-in fade-in duration-300">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary font-bold mb-5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <Card className="border border-slate-100 shadow-xl shadow-slate-100/50 rounded-3xl dark:border-slate-800 dark:shadow-none bg-card">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 text-primary p-2.5 rounded-2xl">
              <Edit2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">Edit Job Posting</CardTitle>
              <CardDescription className="text-xs font-semibold mt-0.5">
                Modify the details of your job listing below.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="space-y-5">
              
              {/* Job Title */}
              <Field>
                <FieldLabel htmlFor="title" className="font-bold text-xs text-slate-800 dark:text-slate-200">Job Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="e.g. Frontend Developer"
                  className="rounded-xl py-5 border-slate-200/80 focus:border-primary dark:border-slate-800"
                  {...form.register("title")}
                />
                <p className="text-xs font-semibold text-red-500 mt-1">
                  {form.formState.errors.title?.message}
                </p>
              </Field>

              {/* Company & Location (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="company" className="font-bold text-xs text-slate-800 dark:text-slate-200">Company</FieldLabel>
                  <Input
                    id="company"
                    placeholder="e.g. Google"
                    className="rounded-xl py-5 border-slate-200/80 focus:border-primary dark:border-slate-800"
                    {...form.register("company")}
                  />
                  <p className="text-xs font-semibold text-red-500 mt-1">
                    {form.formState.errors.company?.message}
                  </p>
                </Field>

                <Field>
                  <FieldLabel htmlFor="location" className="font-bold text-xs text-slate-800 dark:text-slate-200">Location</FieldLabel>
                  <Input
                    id="location"
                    placeholder="e.g. Remote / New York"
                    className="rounded-xl py-5 border-slate-200/80 focus:border-primary dark:border-slate-800"
                    {...form.register("location")}
                  />
                  <p className="text-xs font-semibold text-red-500 mt-1">
                    {form.formState.errors.location?.message}
                  </p>
                </Field>
              </div>

              {/* Employment Type & Experience Level (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel className="font-bold text-xs text-slate-800 dark:text-slate-200">Employment Type</FieldLabel>
                  <Select
                    value={form.watch("employmentType")}
                    onValueChange={(value) =>
                      form.setValue(
                        "employmentType",
                        value as CreateJobData["employmentType"]
                      )
                    }
                  >
                    <SelectTrigger className="w-full rounded-xl h-[42px] border-slate-200/80 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                      <SelectItem value="INTERNSHIP">Internship</SelectItem>
                      <SelectItem value="FREELANCE">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs font-semibold text-red-500 mt-1">
                    {form.formState.errors.employmentType?.message}
                  </p>
                </Field>

                <Field>
                  <FieldLabel className="font-bold text-xs text-slate-800 dark:text-slate-200">Experience Level</FieldLabel>
                  <Select
                    value={form.watch("experienceLevel")}
                    onValueChange={(value) =>
                      form.setValue(
                        "experienceLevel",
                        value as CreateJobData["experienceLevel"]
                      )
                    }
                  >
                    <SelectTrigger className="w-full rounded-xl h-[42px] border-slate-200/80 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FRESHER">Fresher</SelectItem>
                      <SelectItem value="MID">Mid Level</SelectItem>
                      <SelectItem value="SENIOR">Senior Level</SelectItem>
                      <SelectItem value="LEAD">Lead Level</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs font-semibold text-red-500 mt-1">
                    {form.formState.errors.experienceLevel?.message}
                  </p>
                </Field>
              </div>

              {/* Skills */}
              <Field>
                <FieldLabel htmlFor="skills" className="font-bold text-xs text-slate-800 dark:text-slate-200">Required Skills</FieldLabel>
                <Input
                  id="skills"
                  placeholder="e.g. React, TypeScript, Node.js"
                  className="rounded-xl py-5 border-slate-200/80 focus:border-primary dark:border-slate-800"
                  {...form.register("skills")}
                />
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Separate multiple skills with commas.
                </p>
                <p className="text-xs font-semibold text-red-500 mt-1">
                  {form.formState.errors.skills?.message}
                </p>
              </Field>

              {/* Salary Fields (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="salaryMin" className="font-bold text-xs text-slate-800 dark:text-slate-200">Min Salary</FieldLabel>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="e.g. 50000"
                    className="rounded-xl py-5 border-slate-200/80 focus:border-primary dark:border-slate-800"
                    {...form.register("salaryMin", { valueAsNumber: true })}
                  />
                  <p className="text-xs font-semibold text-red-500 mt-1">
                    {form.formState.errors.salaryMin?.message}
                  </p>
                </Field>

                <Field>
                  <FieldLabel htmlFor="salaryMax" className="font-bold text-xs text-slate-800 dark:text-slate-200">Max Salary</FieldLabel>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="e.g. 80000"
                    className="rounded-xl py-5 border-slate-200/80 focus:border-primary dark:border-slate-800"
                    {...form.register("salaryMax", { valueAsNumber: true })}
                  />
                  <p className="text-xs font-semibold text-red-500 mt-1">
                    {form.formState.errors.salaryMax?.message}
                  </p>
                </Field>

                <Field>
                  <FieldLabel htmlFor="salaryCurrency" className="font-bold text-xs text-slate-800 dark:text-slate-200">Currency</FieldLabel>
                  <Input
                    id="salaryCurrency"
                    placeholder="USD"
                    className="rounded-xl py-5 border-slate-200/80 focus:border-primary dark:border-slate-800"
                    {...form.register("salaryCurrency")}
                  />
                  <p className="text-xs font-semibold text-red-500 mt-1">
                    {form.formState.errors.salaryCurrency?.message}
                  </p>
                </Field>
              </div>

              {/* Application Deadline */}
              <Field>
                <FieldLabel htmlFor="applicationDeadline" className="font-bold text-xs text-slate-800 dark:text-slate-200">Application Deadline</FieldLabel>
                <Input
                  id="applicationDeadline"
                  type="date"
                  className="rounded-xl py-5 border-slate-200/80 focus:border-primary dark:border-slate-800"
                  {...form.register("applicationDeadline")}
                />
                <p className="text-xs font-semibold text-red-500 mt-1">
                  {form.formState.errors.applicationDeadline?.message}
                </p>
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel htmlFor="description" className="font-bold text-xs text-slate-800 dark:text-slate-200">Job Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of the roles, responsibilities, and requirements..."
                  rows={5}
                  className="rounded-xl border-slate-200/80 focus:border-primary dark:border-slate-800 min-h-[120px]"
                  {...form.register("description")}
                />
                <p className="text-xs font-semibold text-red-500 mt-1">
                  {form.formState.errors.description?.message}
                </p>
              </Field>

            </FieldGroup>

            <Button
              type="submit"
              className="w-full py-6 mt-6 rounded-xl font-bold cursor-pointer transition-all active:scale-[0.98]"
              disabled={updateJobMutation.isPending}
            >
              {updateJobMutation.isPending ? "Updating Job..." : "Update Job Listing"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
