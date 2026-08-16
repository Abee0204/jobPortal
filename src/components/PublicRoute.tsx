import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import FullScreenLoader from "@/pages/FullScreenLoader";
import { getToken } from "@/utils/token";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const token = getToken();

  if (!token) {
    return <Outlet />;
  }

  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (user) {
    const targetPath =
      user.role === "recruiter" ? "/recruiter/dashboard" : "/dashboard";
    return <Navigate to={targetPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;