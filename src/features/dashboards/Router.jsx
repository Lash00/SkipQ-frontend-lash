// router.jsx  (or wherever you define your routes)
// Drop this into your createBrowserRouter / RouterProvider setup.

import { createBrowserRouter, Navigate } from "react-router-dom";
import DeveloperDashboard             from "./DeveloperDashboard";
import SignupRequestsWithDrawerPage   from "./SignupRequestsWithDrawerPage";
import DevelopmentTeamPage            from "./DevelopmentTeamPage";
import LogsPage                       from "./LogsPage";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <DeveloperDashboard />,   // ← persistent layout (sidebar + topbar)
    children: [
      { index: true, element: <Navigate to="signup-requests" replace /> },
      { path: "signup-requests", element: <SignupRequestsWithDrawerPage /> },
      { path: "team",            element: <DevelopmentTeamPage /> },
      { path: "logs",            element: <LogsPage /> },
    ],
  },
  // other top-level routes (login, etc.) go here
]);