import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Users, LogOut, X } from "lucide-react";
import themesMAP from "../../../../themes/themes";

const NAV_ITEMS = [
  {
    key: "signup-requests",
    label: "Signup Requests",
    icon: FileText,
    path: "/devdashboard/signup-requests",
  },
  {
    key: "team",
    label: "Team",
    icon: Users,
    path: "/devdashboard/team",
  },
  {
    key: "logs",
    label: "Logs",
    icon: FileText,
    path: "/devdashboard/logs",
  },
];

export default function AdminSidebar({ dark, mobile = false, onClose }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const muted = dark ? "#94a3b8" : "#64748b";
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#e2e8f0";
  const primary = "#410fc7";

  const itemBase =
    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    if (mobile && onClose) onClose();
  };

  const content = (
    <div
      className={`${
        mobile ? "w-[280px] h-full" : "w-[230px] min-h-screen"
      } border-r px-4 py-6 flex flex-col justify-between`}
      style={{ backgroundColor: cardBg, borderColor: border }}
    >
      <div>
        <div className="mb-8 px-2 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: primary }}>
              SkipQ
            </h1>
            <p className="text-xs mt-1" style={{ color: muted }}>
              Queue Management
            </p>
          </div>

          {mobile && (
            <button onClick={onClose} style={{ color: muted }}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="space-y-2">
          {NAV_ITEMS.map(({ key, label, icon: Icon, path }) => {
            const isActive = pathname === path;

            return (
              <button
                key={key}
                onClick={() => {
                  navigate(path);
                  if (mobile && onClose) onClose();
                }}
                className={itemBase}
                style={{
                  backgroundColor: isActive ? primary : "transparent",
                  color: isActive ? "#ffffff" : text,
                }}
              >
                <Icon size={17} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ backgroundColor: dark ? "#0f172a" : "#f1f5f9" }}
        >
          <p className="text-sm font-semibold" style={{ color: text }}>
            dev
          </p>
          <p className="text-xs" style={{ color: muted }}>
            DEVELOPER_ADMIN
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl"
          style={{ color: "#ef4444" }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );

  if (!mobile) return content;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        <motion.div
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ duration: 0.25 }}
          className="absolute top-0 left-0 h-full"
        >
          {content}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}