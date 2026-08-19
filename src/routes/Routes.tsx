import { createBrowserRouter } from "react-router-dom";
import ApplicantsPage from "@/pages/ApplicantsPage";
import ApplicationPage from "@/pages/ApplicationPage";
import CreateJob from "@/pages/CreateJob";
import DashboardPage from "@/pages/DashboardPage";
import JobDetails from "@/pages/JobDetails";
import JobsPage from "@/pages/JobsPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import Profile from "@/pages/Profile";
import RecruiterJob from "@/pages/RecruiterJob";
import RecruiterDashboardPage from "@/pages/RecruiterDashboardPage";
import RegisterPage from "@/pages/RegisterPage";
import RecruiterJobDetails from "@/pages/RecruiterJobDetails";
import EditJobPage from "@/pages/EditJobPage";
import ErrorPage from "@/pages/ErrorPage";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleRoute from "@/components/RoleRoute";
import PublicRoute from "@/components/PublicRoute";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "/", element: <LandingPage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RoleRoute allowedRoles={["candidate"]} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "/dashboard", element: <DashboardPage /> },
              { path: "/jobs", element: <JobsPage /> },
              { path: "/jobs/:jobId", element: <JobDetails /> },
              { path: "/application", element: <ApplicationPage /> },
              { path: "/profile", element: <Profile /> },
            ],
          },
        ],
      },
      {
        element: <RoleRoute allowedRoles={["recruiter"]} />,
        children: [
          {
            element: <RecruiterLayout />,
            children: [
              { path: "/recruiter/dashboard", element: <RecruiterDashboardPage /> },
              { path: "/recruiter/jobs", element: <RecruiterJob /> },
              { path: "/recruiter/jobs/new", element: <CreateJob /> },
              { path: "/recruiter/jobs/:jobId", element: <RecruiterJobDetails /> },
              { path: "/jobs/edit/:jobId", element: <EditJobPage /> },
              { path: "/jobs/:jobId/applicants", element: <ApplicantsPage /> },
              { path: "/recruiter/profile", element: <Profile /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: (
      <ErrorPage
        code={404}
        title="Page Not Found"
        message="The page you are looking for doesn't exist."
      />
    ),
  },
]);
