import { useState } from "react";
import { NavLink } from "react-router-dom";
import themesMAP from "../../../themes/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import useAuth from "../../contexts/useAuth";
import { faHouse } from "@fortawesome/free-regular-svg-icons";

// Reusable variants
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? false);
  });
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      style={{
        background: dark
          ? themesMAP["light-main-bg"]
          : themesMAP["dark-main-bg"],
        minHeight: "100vh",
        color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
      }}
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex items-center justify-center px-4 py-8 w-full max-w-md shadow-lg rounded-xl"
        initial={{ opacity: 0, y: -50, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="w-full max-w-md rounded-2xl shadow-lg shadow-gray-600 p-6 sm:p-8">
          {/* Back to Home Link */}
          <motion.div
            className="mb-6 flex items-center justify-between"
            {...fadeSlideDown(0.1)}
          >
            <NavLink
              to="/"
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline transition-all"
            >
              <motion.span
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FontAwesomeIcon
                  icon={faHouse}
                  size="lg"
                  style={{
                    color: dark
                      ? themesMAP["text-light"]
                      : themesMAP["text-dark"],
                  }}
                />
              </motion.span>
              Back to Home
            </NavLink>
          </motion.div>

          {/* Logo + Title */}
          <motion.div className="mb-6" {...fadeSlideUp(0.15)}>
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: "rgb(65, 15, 199)" }}
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                S
              </motion.div>
              <motion.span
                className="text-xl font-bold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                SkipQ
              </motion.span>
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl font-bold mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              Sign in to your account to continue
            </motion.p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  className="bg-red dark:bg-red-200 border border-red-200 dark:border-red-300 text-red-300 dark:text-red-800 text-sm rounded-lg px-4 py-3 font-bold"
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                >
                  {error}
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="text-black ms-3"
                    size="lg"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <motion.div {...fadeSlideUp(0.4)}>
              <label className="block text-sm font-semibold mb-1">
                Email Address
              </label>
              <motion.input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full px-4 py-2.5 border border-gray-500 dark:border-gray-300 rounded-lg shadow-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div {...fadeSlideUp(0.5)}>
              <label className="block text-sm font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full px-4 py-2.5 pr-12 border border-gray-500 dark:border-gray-300 rounded-lg shadow-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
                        style={{
                          color: dark
                            ? themesMAP["text-light"]
                            : themesMAP["text-dark"],
                        }}
                      />
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            {/* Remember Me + Forgot Password */}
            <motion.div
              className="flex items-center justify-between"
              {...fadeSlideUp(0.6)}
            >
              <motion.label
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </motion.label>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Forgot password?
                </NavLink>
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "rgb(65, 15, 199)" }}
              className="w-full py-3 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              {...fadeSlideUp(0.7)}
              whileHover={{ scale: 1.03, backgroundColor: "rgb(80, 30, 220)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="spinner"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size="lg"
                      spin
                      style={{
                        color: dark
                          ? themesMAP["text-light"]
                          : themesMAP["text-dark"],
                      }}
                    />
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
  );
}
