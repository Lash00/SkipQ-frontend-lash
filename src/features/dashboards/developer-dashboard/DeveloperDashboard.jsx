import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Moon, Sun, Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import themesMAP from "../../../../themes/themes";

export default function DeveloperDashboard() {
  const [dark, setDark] = useState(() =>
    JSON.parse(localStorage.getItem("isDark") ?? "false")
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const bg = dark ? themesMAP["light-main-bg"] : themesMAP["dark-main-bg"];
  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#e2e8f0";

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg }}>
      {/* Desktop fixed sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 h-screen w-[230px] z-40">
        <AdminSidebar dark={dark} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <AdminSidebar
          dark={dark}
          mobile
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-[230px] min-h-screen flex flex-col">
        <header
          className="flex items-center justify-between px-4 sm:px-6 py-4 border-b sticky top-0 z-30"
          style={{ backgroundColor: cardBg, borderColor: border }}
        >
          <div className="flex items-center gap-3">
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

          <button
            onClick={toggleDark}
            className="p-2 rounded-xl border transition-opacity hover:opacity-80"
            style={{ backgroundColor: cardBg, borderColor: border, color: text }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5">
            <Outlet context={{ dark }} />
          </div>
        </main>
      </div>
    </div>
  );
}