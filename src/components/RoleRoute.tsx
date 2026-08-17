import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import FullScreenLoader from "@/pages/FullScreenLoader";
import { getToken, removeToken } from "@/utils/token";
import { Navigate, Outlet } from "react-router-dom";

type RoleRouteProps = {
  allowedRoles: Array<"candidate" | "recruiter">;
};

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError || !user) {
    removeToken();
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Strictly enforce role route boundaries
    const fallbackPath =
      user.role === "recruiter" ? "/recruiter/dashboard" : "/dashboard";
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
