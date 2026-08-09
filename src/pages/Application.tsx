import { useMyApplication } from "@/features/applications/hooks/useMyApplications"
import FullScreenLoader from "./FullScreenLoader";
import { ApplicationCard } from "@/features/applications/components/ApplicationCard";
import type { Application } from "@/types/application.types";

const Application = () => {
  const { data, isLoading } = useMyApplication();

if (isLoading) return <FullScreenLoader />;

return (
  <div className="flex flex-col gap-4 m-30">
    {data?.data.myApplication.map((app) => (
      <ApplicationCard key={app.id} application={app} />
    ))}
  </div>
);
}

export default Application
