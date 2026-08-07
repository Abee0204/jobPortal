import type { Job } from "@/types/job.types";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>
        {job.salaryMin && job.salaryMax
          ? `${job.salaryMin} - ${job.salaryMax}`
          : "Salary not disclosed"}
      </p>
    </div>
  );
}
