import { Link, Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <div>
      <div>TopBar will update it later......</div>

      <div className="left-sidebar flex flex-col gap-2 m-3">
        <Link to={"/recruiter/jobs"}> Jobs</Link>
        <Link to={"/recruiter/jobs/new"}>Create Job</Link>
        <Link to={"/recruiter/applicants"}>Applicants</Link>
      </div>

      <div className="right-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default RecruiterLayout;
