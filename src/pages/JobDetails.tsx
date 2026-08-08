import { useJob } from "@/features/jobs/hooks/useJob";
import { Link, useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDeleteJob } from "@/features/jobs/hooks/useDeleteJob";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  if (!jobId) {
    return <h1>Job not found</h1>;
  }

  const deleteJobMutation = useDeleteJob();

  const handleDelete = (jobId: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }
    deleteJobMutation.mutate(jobId, {
      onSuccess: () => {
        toast.success("Job deleted successfully");
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
    });
  };

  const { data: job, isLoading, isError } = useJob(jobId);

  const { data: user } = useCurrentUser();

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-500">Job Not Found</h2>
        <Link to="/jobs" className="text-blue-500 underline">
          Back to List
        </Link>
      </div>
    );
  }

  if (!job) {
    return <h1>Job not found</h1>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl shadow-md mt-40">
      <Link to="/jobs" className="text-sm text-gray-500 hover:underline">
        ← Back to all jobs
      </Link>

      <h1 className="text-3xl font-bold mt-4">{job?.title}</h1>
      <p className="text-xl text-gray-600 mt-2">{job.company}</p>

      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold text-lg text-gray-800">Job Location</h3>
        <p className="text-gray-700 mt-2 leading-relaxed">{job.location}</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-gray-800">Salary</h3>
        <p className="text-gray-700 mt-2 leading-relaxed">
          {`${job.salaryMin} - ${job.salaryMax}`}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-gray-800">Description</h3>
        <p className="text-gray-700 mt-2 leading-relaxed">{job.description}</p>
      </div>

      <div>
        {!user && (
          <button onClick={() => navigate("/login")}>Login to Apply</button>
        )}

        {user?.role === "candidate" && (
          <button
            className="border rounded shadow-md ml-60"
            onClick={() => navigate("/application")}
          >
            Apply Now
          </button>
        )}

        {user?.role === "recruiter" && (
          <div className="flex justify-center gap-7 m-4">
            <Button
              className="border rounded shadow-md "
              onClick={() => navigate(`/jobs/edit/${job.id}`)}
            >
              
              Edit Job
            </Button>
            <Button
              className="border rounded shadow-md "
              onClick={() => handleDelete(job.id)}
              disabled={deleteJobMutation.isPending}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
