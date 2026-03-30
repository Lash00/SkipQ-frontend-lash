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
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<HomeContent />} />
            <Route path="civil-registry" element={<CivilRegistry />} />
            <Route path="civil-registry/:id" element={<BranchDetails />} />
            <Route path="banks" element={<Banks />} />
            <Route path="banks/:bankname/atms" element={<ATMsList />} />
            <Route path="banks/:bankname/atms/:id" element={<ATMDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/registration-guidelines"
            element={<RegesterationGuidelines />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
