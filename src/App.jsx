import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import HomePage from "./features/home/home";
import PageNotFound from "./features/pageNotFound/PageNotFound";
// import Dashboard from "./features/dashboard/Dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
