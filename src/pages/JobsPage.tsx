import { Link } from "react-router-dom";
import JobCard from "../features/jobs/componentes/JobCard";

import { useJobs } from "@/features/jobs/hooks/useJobs";
import FullScreenLoader from "./FullScreenLoader";
const JobsPage = () => {

  const { data: jobs, isLoading, isError } = useJobs();

  if(isLoading)
    return <FullScreenLoader/>;

  if(isError)
    return <h1>Something went wrong</h1>;

  return (
    
    <div className="flex flex-col gap-4 m-30">
      {jobs?.map((job) => (
        <Link key={job.id} to={`/jobs/${job.id}`}>
        <JobCard job={job} />
        </Link>
      ))}
    </div>
    
  );
};

export default JobsPage;
