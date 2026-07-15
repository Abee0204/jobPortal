import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useEffect } from "react";
import { authService } from "@/services/auth.service";

const DashboardLayout = () => {
  useEffect(() => {
  const fetchUser = async () => {
    const user = await authService.getCurrentUser();
    console.log(user);
  };

  fetchUser();
}, []);

  return (
    <>
      <header className="top-navbar">
        <Navbar />
      </header>

      <div className="left-sidebar">
        <Link to={"/dashboard"}>Dashboard</Link>

        <Link to={"/applications"}>Applications</Link>

        <Link to={"/profile"}>Profile</Link>
      </div>

      <main id="main-content" className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
