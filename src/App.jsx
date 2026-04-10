import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import HomePage from "./features/home/HomePage";
import HomeContent from "./features/home/HomeContent";
import CivilRegistry from "./features/civil-registry/CivilRegistry";
import Banks from "./features/banks/Banks";
import Login from "./features/auth/Login";
import ATMsList from "./features/banks/ATMsList";
import Signup from "./features/auth/Signup";
import ATMDetails from "./features/banks/ATMDetails";
import RegesterationGuidelines from "./features/auth/RegesterationGuidelines";
import PageNotFound from "./ui/PageNotFound";
import BranchDetails from "./features/civil-registry/BranchDetails";
import ScrollToTop from "./ui/ScrollToTop";

// Info pages
// import HowItWorks from "./Info/HowItWorks";
import Pricing from "./Info/Pricing";
import FAQ from "./Info/FAQ";
import AboutUs from "./Info/AboutUs";
import Contact from "./Info/Contact";
import PrivacyPolicy from "./Info/PrivacyPolicy";
import TermsOfService from "./Info/TermsOfService";
import HowItWorks from "./info/HowItWorks";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          {/* Main app with layout */}
          <Route path="/" element={<HomePage />}>
            <Route index element={<HomeContent />} />
            <Route path="civil-registry" element={<CivilRegistry />} />
            <Route path="civil-registry/:id" element={<BranchDetails />} />
            <Route path="banks" element={<Banks />} />
            <Route path="banks/:bankname/atms" element={<ATMsList />} />
            <Route path="banks/:bankname/atms/:id" element={<ATMDetails />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/registration-guidelines"
            element={<RegesterationGuidelines />}
          />

          {/* Info pages (standalone with their own minimal navbar) */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
