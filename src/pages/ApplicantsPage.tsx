import { useParams } from "react-router-dom";
import { useJobApplications } from "@/features/applications/hooks/useJobApplications";
import FullScreenLoader from "./FullScreenLoader";

const JobApplicationsPage = () => {
  const { jobId } = useParams();

  const { data, isLoading } = useJobApplications(jobId!);

  if (isLoading) return <FullScreenLoader />;

  const applications = data?.data?.allApplications || [];
  console.log(applications);
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Applicants</h1>

      {applications.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        applications.map((app: any) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 shadow"
          >
            <p><strong>Name:</strong> {app.user?.name}</p>
            <p><strong>Email:</strong> {app.user?.email}</p>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default JobApplicationsPage;