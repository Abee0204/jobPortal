import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { removeToken } from "@/utils/token";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const { data: user, isLoading } = useCurrentUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Always start visible
    setVisible(true);
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near the top
      if (currentScrollY <= 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    removeToken();

    queryClient.removeQueries({
      queryKey: ["currentUser"],
    });

    navigate("/login");
    toast.success("Logged out successfully");
  };

  if (isLoading) return null;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors font-medium ${
      isActive
        ? "text-[#140B2D] font-semibold"
        : "text-gray-700 hover:text-[#140B2D]"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 flex justify-center transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <nav className="mx-4 flex w-full max-w-6xl items-center justify-between rounded-full bg-white/90 px-8 py-4 shadow-xl backdrop-blur-md">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl font-extrabold tracking-tight text-[#140B2D]"
        >
          hireHub
        </NavLink>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <NavLink to="/jobs" className={navLinkClass}>
            Jobs
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>

              <Button
                onClick={handleLogout}
                className="rounded-full bg-[#140B2D] px-6 hover:bg-[#26154D]"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

              <NavLink to="/register">
  <Button className="rounded-full bg-[#140B2D] px-6 hover:bg-[#26154D]">
    Get Started
  </Button>
</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;