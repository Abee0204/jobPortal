import { createBrowserRouter } from "react-router-dom";
import {
  ApplicantsPage,
  Application,
  CreateJob,
  DashboardPage,
  JobDetails,
  JobsPage,
  LandingPage,
  LoginPage,
  Profile,
  RecruiterJob,
  RegisterPage,
} from "../handleImport/pagesImport";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
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
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/application", element: <Application /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    element: <RecruiterLayout />,
    children: [
      { path: "/recruiter/jobs", element: <RecruiterJob /> },
      { path: "/recruiter/jobs/new", element: <CreateJob /> },
      { path: "/recruiter/applicants", element: <ApplicantsPage /> },
    ],
  },
]);
