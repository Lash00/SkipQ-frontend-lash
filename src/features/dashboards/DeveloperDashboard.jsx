// DeveloperDashboard.jsx
// Layout shell — wraps all admin pages with a persistent sidebar.
// Add this to your router as a parent route with children:
//


import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Moon, Sun, Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import themesMAP from "../../../themes/themes";

export default function DeveloperDashboard() {
  const [dark, setDark] = useState(() =>
    JSON.parse(localStorage.getItem("isDark") ?? "false")
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Keep dark state in sync if another tab changes it
  useEffect(() => {
    const sync = () =>
      setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    localStorage.setItem("isDark", JSON.stringify(next));
    setDark(next);
  };

  const bg      = dark ? themesMAP["light-main-bg"] : themesMAP["dark-main-bg"];
  const text    = dark ? themesMAP["text-light"]    : themesMAP["text-dark"];
  const cardBg  = dark ? "#1e293b" : "#ffffff";
  const border  = dark ? "#334155" : "#e2e8f0";

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: bg }}>

      {/* ── Persistent desktop sidebar ── */}
      <div className="hidden lg:block flex-shrink-0">
        <AdminSidebar dark={dark} />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <AdminSidebar
          dark={dark}
          mobile
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top navbar — shared across all pages */}
        <header
          className="flex items-center justify-between px-4 sm:px-6 py-4 border-b flex-shrink-0"
          style={{ backgroundColor: cardBg, borderColor: border }}
        >
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border transition-opacity hover:opacity-80"
              style={{ backgroundColor: cardBg, borderColor: border, color: text }}
            >
              <Menu size={18} />
            </button>

            <p className="text-base sm:text-lg font-semibold" style={{ color: text }}>
              Welcome back, dev
            </p>
          </div>

          {/* Dark-mode toggle */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-xl border transition-opacity hover:opacity-80"
            style={{ backgroundColor: cardBg, borderColor: border, color: text }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Page content — child routes render here */}
        <main className="flex-1 overflow-auto">
          <div className="w-full px-3 sm:px-4 md:px-6 lg:px-6 py-4 sm:py-5
                          lg:scale-[0.9] lg:origin-top-left lg:w-[111.111%]">
            <Outlet context={{ dark }} />
          </div>
        </main>
      </div>
    </div>
  );
}