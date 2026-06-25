import { Link, useParams } from "react-router-dom";
import { jobs } from "../features/jobs/MockJobs";

const JobDetails = () => {
  const { jobId } = useParams();

  const currentJob = jobs.find((job) => String(job.id) === String(jobId));

  if (!currentJob) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-500">Job Not Found</h2>
        <Link to="/jobs" className="text-blue-500 underline">
          Back to List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl shadow-md mt-6">
      <Link to="/jobs" className="text-sm text-gray-500 hover:underline">
        ← Back to all jobs
      </Link>

      <h1 className="text-3xl font-bold mt-4">{currentJob.title}</h1>
      <p className="text-xl text-gray-600 mt-2">{currentJob.company}</p>

      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold text-lg text-gray-800">Job Location</h3>
        <p className="text-gray-700 mt-2 leading-relaxed">
          {currentJob.location}
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-gray-800">Salary</h3>
        <p className="text-gray-700 mt-2 leading-relaxed">
          {currentJob.salary}
        </p>
      </div>

      <div>
        <button>Apply here</button>
      </div>
    </div>
  );
};

export default JobDetails;
