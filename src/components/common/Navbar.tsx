import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { removeToken } from "@/utils/token";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { data: user, isLoading } = useCurrentUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    removeToken();

    queryClient.removeQueries({
      queryKey: ["currentUser"],
    });

    navigate("/login");
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-row justify-between gap-3">
      <div>
        <NavLink to="/">Logo</NavLink>
      </div>

      <div className="flex flex-row gap-3 items-center">
        <NavLink to="/jobs">Jobs</NavLink>

        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;