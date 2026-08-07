import { useMyJobs } from "@/features/jobs/hooks/useMyJobs"
import FullScreenLoader from "./FullScreenLoader";
import { Link } from "react-router-dom";
import JobCard from "@/features/jobs/components/JobCard";

const RecruiterJob = () => {

  const {data: myJobs,isLoading , isError} = useMyJobs();

  if(isLoading)
    return <FullScreenLoader/>;

  if(isError)
    return <h2>Something went wrong</h2>

  if (!myJobs) {
  return <h2>No jobs posted yet.</h2>;
}

  return (
    <div>
      <div className="flex flex-col gap-4 m-30">
      {myJobs.map((job) => (
        <Link key={job.id} to={`/jobs/${job.id}`}>
        <JobCard job={job} />
        </Link>
      ))}
    </div> 
    </div>
  );
};

export default RecruiterJob
