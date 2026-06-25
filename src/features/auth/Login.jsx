import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import themesMAP from "../../../themes/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faExclamationCircle,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../ui/naveBar"; // adjust path if needed
import useAuth from "../../contexts/useAuth"; // <-- عدّل المسار على حسب مكان الملف عندك

const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

const fadeSlideDown = (delay = 0) => ({
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: "easeOut" },
});

// -----------------------------------------------------------------------
// بيحدد المستخدم بعد تسجيل الدخول يتوجه على فين، على حسب الـ role
// (و sector لو سوبر أدمن). عدّل المسارات دي لو أسامي الراوتس عندك مختلفة.
// -----------------------------------------------------------------------
/*

  { role_id: 1, role_name: "Super Admin" },
  { role_id: 2, role_name: "Branch Manager" },
  { role_id: 11, role_name: "Developer" },

*/
function getRedirectPath(user) {
  if (!user) return "/";

  if (user.role === "Developer") {
    return "/devDashboard";
  }
  if (user.role === "Super Admin") {
    // نفس الكومبوننت بتاع الداش بورد، بس هو اللي بيقرأ sector من user
    // عشان يقرر يعرض سيكشن ATMs (بنوك) أو لأ (سجل مدني).
    return "/superDashboard";
  }
  if (user.role === "Branch Manager") {
    return "/branchDashboard";
  }
  return "/";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const sync = () =>
      setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const user = await login({ email, password });
      navigate(getRedirectPath(user), { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const bg = dark ? themesMAP["light-main-bg"] : themesMAP["dark-main-bg"];
  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const muted = dark ? "#94a3b8" : "#64748b";
  const borderColor = dark ? "#334155" : "#e2e8f0";
  const inputBg = dark ? "#0f172a" : "#ffffff";
  const primary = "#410fc7";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} />

      <motion.div
        className="flex items-center justify-center px-4 py-8"
        style={{ color: text, minHeight: "calc(100vh - 80px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: -40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="w-full rounded-3xl p-8 md:p-12"
            style={{
              backgroundColor: cardBg,
              boxShadow: dark
                ? "0 4px 24px rgba(0,0,0,0.3)"
                : "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            {/* Back to Home Link */}
            <motion.div
              className="mb-6 flex items-center justify-between"
              {...fadeSlideDown(0.1)}
            >
              <NavLink
                to="/"
                className="text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: muted }}
              >
                Back to Home
              </NavLink>
            </motion.div>

            {/* Logo + Title */}
            <motion.div className="mb-8" {...fadeSlideUp(0.15)}>
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: primary }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  S
                </motion.div>

                <motion.span
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  style={{ color: text }}
                >
                  SkipQ
                </motion.span>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{ color: text }}
              >
                Welcome Back
              </motion.h1>

              <motion.p
                className="text-base md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                style={{ color: muted }}
              >
                Sign in to your account to continue
              </motion.p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="error"
                    className="rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-3"
                    style={{
                      backgroundColor: dark ? "#3f1d1d" : "#fef2f2",
                      color: dark ? "#fca5a5" : "#b91c1c",
                      border: `1px solid ${dark ? "#7f1d1d" : "#fecaca"}`,
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span>{error}</span>
                    <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div {...fadeSlideUp(0.4)}>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: text }}
                >
                  Email Address
                </label>

                <motion.input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all text-sm"
                  style={{
                    backgroundColor: inputBg,
                    borderColor,
                    color: text,
                  }}
                />
              </motion.div>

              <motion.div {...fadeSlideUp(0.5)}>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: text }}
                >
                  Password
                </label>

                <div className="relative">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 focus:outline-none transition-all text-sm"
                    style={{
                      backgroundColor: inputBg,
                      borderColor,
                      color: text,
                    }}
                  />

                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: muted }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={showPassword ? "eye" : "eyeSlash"}
                        initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          size="lg"
                        />
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-between"
                {...fadeSlideUp(0.6)}
              >
                <motion.label
                  className="flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: primary }}
                  />
                  <span className="text-sm" style={{ color: muted }}>
                    Remember me
                  </span>
                </motion.label>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <NavLink
                    to="/forgot-password"
                    className="text-sm font-medium hover:underline"
                    style={{ color: primary }}
                  >
                    Forgot password?
                  </NavLink>
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full py-3 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: primary }}
                {...fadeSlideUp(0.7)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatePresence mode="wait">
                  {submitting ? (
                    <motion.span
                      key="spinner"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faSpinner} size="lg" spin />
                      Signing in...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="signin"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      Sign In
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
