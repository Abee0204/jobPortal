import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

const PublicLayout = () => {
  const { pathname } = useLocation();
  const { data: user } = useCurrentUser();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950">
      <header className="top-navbar">
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {!isAuthPage && <Footer role={user?.role} />}
    </div>
  );
};

export default PublicLayout;
