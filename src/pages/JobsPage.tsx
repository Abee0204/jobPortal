import { Link } from "react-router-dom";
import JobCard from "../features/jobs/componentes/JobCard";
import { jobs } from "../features/jobs/MockJobs";
const JobsPage = () => {
  return (
    
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <Link to={`/jobs/${job.id}`}>
        <JobCard key={job.id} job={job} />
        </Link>
      ))}
    </div>
    
  );
};

export default JobsPage;
