import { Navigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";

function ProtectedRoute({ children, role }) {
  const { user, loading, isDeveloper, isSuperAdmin, isBranchManager } =
    useAuth();

  if (loading) {
    return null;
    // أو Spinner
  }

  // المستخدم مش عامل Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // التحقق من الـ Role
  switch (role) {
    case "developer":
      if (!isDeveloper) {
        return <Navigate to="/" replace />;
      }
      break;

    case "super_admin":
      if (!isSuperAdmin) {
        return <Navigate to="/" replace />;
      }
      break;

    case "branch_manager":
      if (!isBranchManager) {
        return <Navigate to="/" replace />;
      }
      break;

    default:
      break;
  }

  return children;
}

export default ProtectedRoute;
