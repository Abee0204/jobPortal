import { createBrowserRouter } from "react-router-dom";
import {
  ApplicantsPage,
  ApplicationPage,
  CreateJob,
  DashboardPage,
  JobDetails,
  JobsPage,
  LandingPage,
  LoginPage,
  Profile,
  RecruiterJob,
  RecruiterDashboardPage,
  RegisterPage,
} from "../handleImport/pagesImport";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleRoute from "@/components/RoleRoute";
import PublicRoute from "@/components/PublicRoute";
import EditJobPage from "@/pages/EditJobPage";
import ErrorPage from "@/pages/ErrorPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/jobs", element: <JobsPage /> },
      { path: "/jobs/:jobId", element: <JobDetails /> },
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
              { path: "/jobs/:jobId/applicants", element: <ApplicantsPage /> },
              { path: "/recruiter/jobs/new", element: <CreateJob /> },
              { path: "/jobs/edit/:jobId", element: <EditJobPage /> },
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
