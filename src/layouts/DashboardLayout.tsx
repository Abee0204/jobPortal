import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

const DashboardLayout = () => {
  const { data, isLoading, isError } = useCurrentUser();
  console.log(data);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Something went wrong</h1>;

  return (
    <>
      <header className="top-navbar">
        <Navbar />
      </header>

      <div className="left-sidebar">
        <Link to={"/dashboard"}>Dashboard</Link>

        <Link to={"/application"}>Applications</Link>

        <Link to={"/profile"}>Profile</Link>
      </div>

      <main id="main-content" className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
