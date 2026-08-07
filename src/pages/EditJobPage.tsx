import { EditJobForm } from "@/features/jobs/components/EditJobForm";
import { useParams } from "react-router-dom";


const EditJobPage = () => {
  const { jobId } = useParams();

  if (!jobId) return <h1>Invalid Job</h1>;

  return <EditJobForm jobId={jobId} />;
};

export default EditJobPage
