import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import FullScreenLoader from "@/pages/FullScreenLoader";

const DashboardLayout = () => {
  const { data:user, isLoading, isError } = useCurrentUser();
  
  if (isLoading) return <FullScreenLoader/>;

  if (isError) return <h1>Something went wrong</h1>;

  return (
    <>
      <header className="top-navbar">
        <Navbar />
      </header>

      <div className="left-sidebar">
        <Link to={"/dashboard"}>Dashboard</Link>

        {(user?.role === "candidate" && <Link to={"/application"}>Applications</Link>)}

       { (user?.role === "recruiter" && <Link to={"/recruiter/applicants"}>Applicants</Link>)}

        <Link to={"/profile"}>Profile</Link>
      </div>

      <main id="main-content" className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
