import { useParams } from "react-router-dom";
import { useMyApplicants } from "../hooks/useMyApplicants";
import FullScreenLoader from "@/pages/FullScreenLoader";
import type { Applicant } from "@/types/application.types";

const getStatusColor = (status: string) => {
  if (status === "ACCEPTED") return "text-green-500";
  if (status === "REJECTED") return "text-red-500";
  if (status === "REVIEWING") return "text-blue-500";
  return "text-yellow-500";
};

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const { data, isLoading } = useMyApplicants(jobId!);

  if (isLoading) return <FullScreenLoader />;

  const applications = data?.data?.allApplications || [];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Applicants</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applicants yet</p>
      ) : (
        applications.map((app: Applicant) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p>
              <strong>Name:</strong> {app.user?.name}
            </p>
            <p>
              <strong>Email:</strong> {app.user?.email}
            </p>
            <p className={`text-sm font-medium ${getStatusColor(app.status)}`}>
              <strong>Status:</strong> {app.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ApplicantsPage;
