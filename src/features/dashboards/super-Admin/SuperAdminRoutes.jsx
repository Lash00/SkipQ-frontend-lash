import { Routes, Route, Navigate } from "react-router-dom";
import SuperAdminOverview from "./SuperAdminOverview";
import SuperAdminBranches from "./SuperAdminBranches";
import SuperAdminManagers from "./SuperAdminManagers";
import SuperAdminCameras from "./SuperAdminCameras";
import SuperAdminAtms from "./SuperAdminAtms";
import useAuth from "../../../contexts/useAuth";
import { SECTORS } from "../../../data/mockData";

/**
 * SuperAdminRoutes.jsx
 * -----------------------------------------------------------------------
 * Mount this under your main router, e.g.:
 *
 *   <Route path="/dashboards/super-admin/*" element={<SuperAdminRoutes />} />
 *
 * It guards against:
 *   - non-super-admins hitting these routes
 *   - civil-registry super admins hitting /atms directly (bank-only page)
 * -----------------------------------------------------------------------
 */

export default function SuperAdminRoutes() {
  const { isSuperAdmin, sector, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (!isSuperAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route index element={<SuperAdminOverview />} />
      <Route path="branches" element={<SuperAdminBranches />} />
      <Route path="managers" element={<SuperAdminManagers />} />
      <Route path="cameras" element={<SuperAdminCameras />} />
      <Route
        path="atms"
        element={sector === SECTORS.BANK ? <SuperAdminAtms /> : <Navigate to=".." replace />}
      />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}
