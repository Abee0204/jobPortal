import type { Application } from "@/types/application.types";

type ApplicationDetails = {
  application: Application;
};

const getStatusColor = (status: string) => {
  if (status === "ACCEPTED") return "text-green-500";
  if (status === "REJECTED") return "text-red-500";
  return "text-yellow-500";
};

export const ApplicationCard = ({ application }: ApplicationDetails) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-semibold">{application.job.title}</h2>

      <p className="text-gray-500">{application.job.company}</p>

      <p className={`text-sm font-medium ${getStatusColor(application.status)}`}>
        {application.status}
      </p>
    </div>
  );
};
