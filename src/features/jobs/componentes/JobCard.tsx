import type { Job } from "../types";

type JobCardProps = {
  job: Job;
};

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
    </div>
  );
};

export default JobCard;