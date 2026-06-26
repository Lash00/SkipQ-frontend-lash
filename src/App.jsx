// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Main
import HomePage from "./features/home/HomePage";
import HomeContent from "./features/home/HomeContent";
import CivilRegistry from "./features/civil-registry/CivilRegistry";
import Banks from "./features/banks/Banks";
import BranchDetails from "./features/civil-registry/BranchDetails";
import ATMsList from "./features/banks/ATMsList";
import ATMDetails from "./features/banks/ATMDetails";

// Auth
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import SetPassword from "./features/auth/SetPassword";
import RegesterationGuidelines from "./features/auth/RegesterationGuidelines";

// Developer Dashboard
import DeveloperDashboard from "./features/dashboards/developer-dashboard/DeveloperDashboard";
import SignupRequests from "./features/dashboards/developer-dashboard/SignupRequests";
import Team from "./features/dashboards/developer-dashboard/Team";
import Logs from "./features/dashboards/developer-dashboard/Logs";
// import ProtectedRoute from "./features/dashboards/developer-dashboard/ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Super Admin Dashboard
import SuperAdminLayout from "./features/dashboards/super-Admin/components/SuperAdminLayout";
import SuperAdminOverview from "./features/dashboards/super-Admin/SuperAdminOverview";
import SuperAdminBranches from "./features/dashboards/super-Admin/SuperAdminBranches";
import SuperAdminManagers from "./features/dashboards/super-Admin/SuperAdminManagers";
import SuperAdminCameras from "./features/dashboards/super-Admin/SuperAdminCameras";
import SuperAdminAtms from "./features/dashboards/super-Admin/SuperAdminAtms";

// Branch Manager Dashboard
import BranchManagerLayout from "./features/dashboards/BranchManager/components/BranchManagerLayout";
import BranchManagerOverview from "./features/dashboards/BranchManager/BranchManagerOverview";
import BranchManagerQueue from "./features/dashboards/BranchManager/BranchManagerQueue";
import BranchManagerAtms from "./features/dashboards/BranchManager/BranchManagerAtms";
import BranchManagerSettings from "./features/dashboards/BranchManager/BranchManagerSettings";

// Info
import HowItWorks from "./info/HowItWorks";
import Pricing from "./info/Pricing";
import FAQ from "./info/FAQ";
import AboutUs from "./info/AboutUs";
import Contact from "./info/Contact";
import PrivacyPolicy from "./info/PrivacyPolicy";
import TermsOfService from "./info/TermsOfService";

// UI
import ScrollToTop from "./ui/ScrollToTop";
import PageNotFound from "./ui/PageNotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />

        <Routes>
          {/* ================= Home ================= */}

          <Route path="/" element={<HomePage />}>
            <Route index element={<HomeContent />} />

            <Route path="civil-registry" element={<CivilRegistry />} />
            <Route path="civil-registry/:id" element={<BranchDetails />} />

            <Route path="banks" element={<Banks />} />
            <Route path="banks/:bankname/atms" element={<ATMsList />} />
            <Route path="banks/:bankname/atms/:id" element={<ATMDetails />} />
          </Route>

          {/* ================= Authentication ================= */}

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/setPassword/:token" element={<SetPassword />} />
          </Route>
          <Route
            path="/registration-guidelines"
            element={<RegesterationGuidelines />}
          />
          <Route path="/devDashboard" element={<DeveloperDashboard />}>
            <Route index element={<Navigate to="signup-requests" replace />} />
            <Route path="signup-requests" element={<SignupRequests />} />
            <Route path="team" element={<Team />} />
            <Route path="logs" element={<Logs />} />
          </Route>

          {/* ================= Super Admin Dashboard ================= */}

          <Route
            path="/superDashboard"
            element={
              <ProtectedRoute role="Super Admin">
                <SuperAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SuperAdminOverview />} />

            <Route path="branches" element={<SuperAdminBranches />} />

            <Route path="managers" element={<SuperAdminManagers />} />

            <Route path="cameras" element={<SuperAdminCameras />} />

            <Route path="atms" element={<SuperAdminAtms />} />
          </Route>

          {/* ================= Branch Manager Dashboard ================= */}

          <Route
            path="/branchDashboard"
            element={
              <ProtectedRoute role="Branch Manager">
                <BranchManagerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<BranchManagerOverview />} />

            <Route path="queue" element={<BranchManagerQueue />} />

            <Route path="atms" element={<BranchManagerAtms />} />

            <Route path="settings" element={<BranchManagerSettings />} />
          </Route>

          {/* Info pages (standalone with their own minimal navbar) */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* ================= 404 ================= */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
