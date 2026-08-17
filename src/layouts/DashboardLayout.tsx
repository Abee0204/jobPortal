import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import FullScreenLoader from "@/pages/FullScreenLoader";
import Navbar from "../components/common/Navbar";
import { CandidateSidebar } from "../components/common/CandidateSidebar";

const DashboardLayout = () => {
  const { data: user, isLoading, isError } = useCurrentUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <h1 className="p-8 text-center text-rose-500 font-bold">Something went wrong</h1>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body */}
      <div className="flex flex-1 pt-24">
        {/* Candidate Left Sidebar */}
        <CandidateSidebar
          user={user}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* Main Content Area */}
        <main
          id="main-content"
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? "lg:pl-28" : "lg:pl-72"
          }`}
        >
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
