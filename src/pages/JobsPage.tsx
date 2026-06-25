import JobCard from "../features/jobs/componentes/JobCard";
import { jobs } from "../features/jobs/MockJobs";
const JobsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsPage;
