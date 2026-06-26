import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// هوك بسيط عشان مش تكتب useContext(AuthContext) كل مرة
// في ملف لوحده عشان Fast Refresh مش يشتكي (لازم الملف يصدّر components بس)
const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
};

export default useAuth;
