import { createContext, useEffect, useState } from "react";
import * as authService from "../services/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // عشان الراوتر ميعملش redirect قبل ما نعرف لو فيه توكن صالح

  //  Signup
  const signup = async (data) => {
    const res = await authService.signupRequest(data);
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  //  login
  const login = async (data) => {
    const res = await authService.loginRequest(data);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    setUser(res.user);
    return res.user; // رجعتها عشان تقدر تعمل redirect في صفحة اللوجين على حسب الدور فورًا
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Load user on app start
  // useEffect(() => {
  //   const loadUser = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         setLoading(false);
  //         return;
  //       }

  //       const res = await authService.getMeRequest();
  //       setUser(res.user);
  //     } catch (err) {
  //       console.error(err);
  //       localStorage.removeItem("token");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUser();
  // }, []);
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        setLoading(false);
        return;
      }

      setUser(JSON.parse(storedUser));
      setLoading(false);
    };

    loadUser();
  }, []);

  // ---- Role / sector helpers (مشتقة من user، مش state جديد) ----
  // متوقع إن الـ backend بترجع user.role و user.sector (لو سوبر أدمن)
  // و user.branch_id (لو مدير فرع) — زي ما اتفقنا في الـ login endpoint.
  const role = user?.role ?? null; // "developer" | "super_admin" | "branch_manager"
  const sector = user?.sector ?? null; // "bank" | "civil_registry" | null
  const isDeveloper = role === "developer";
  const isSuperAdmin = role === "super_admin";
  const isBranchManager = role === "branch_manager";

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    role,
    sector,
    isDeveloper,
    isSuperAdmin,
    isBranchManager,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
