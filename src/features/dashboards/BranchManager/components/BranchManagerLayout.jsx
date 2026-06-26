import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faBolt,
  faMoneyBillTransfer,
  faGear,
  faRightFromBracket,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../../contexts/useAuth";
import {
  getBranchById,
  getOrgById,
  SECTORS,
} from "../../../../../data/mockData";

/**
 * BranchManagerLayout.jsx
 * -----------------------------------------------------------------------
 * شِل (sidebar + topbar) بتاع كل صفحات مدير الفرع، بنفس باترن
 * SuperAdminLayout.jsx بالظبط — بس باستخدام <Outlet /> لأن ده الراوتر
 * بتاعك شكله مختلف شوية (parent route فيها index + children).
 *
 * السايدبار زي الصورة المرجعية:
 *   Dashboard | Queue Management | ATMs (بنوك بس) | Settings
 * -----------------------------------------------------------------------
 */

const NAV_BASE = "/branchDashboard";

export default function BranchManagerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });

  useEffect(() => {
    const sync = () =>
      setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("isDark", JSON.stringify(next));
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // sector بتاع فرع المدير ده — مستخرج من branch_id الموجود في user
  const branch = user?.branch_id ? getBranchById(user.branch_id) : null;
  const org = branch ? getOrgById(branch.org_id) : null;
  const sector = org?.sector ?? null;

  // ---- Theme tokens (نفس اللي في SuperAdminLayout بالظبط) ----
  const bg = dark ? "#0f172a" : "#f8fafc";
  const sidebarBg = dark ? "#1e293b" : "#ffffff";
  const text = dark ? "#f1f5f9" : "#0f172a";
  const muted = dark ? "#94a3b8" : "#64748b";
  const borderColor = dark ? "#334155" : "#e2e8f0";
  const primary = "#410fc7";
  const activeBg = dark ? "rgba(65,15,199,0.18)" : "rgba(65,15,199,0.08)";

  const navItems = [
    { to: `${NAV_BASE}`, label: "Dashboard", icon: faGauge, end: true },
    { to: `${NAV_BASE}/queue`, label: "Queue Management", icon: faBolt },
    ...(sector === SECTORS.BANK
      ? [{ to: `${NAV_BASE}/atms`, label: "ATMs", icon: faMoneyBillTransfer }]
      : []),
    // { to: `${NAV_BASE}/settings`, label: "Settings", icon: faGear },
  ];

  return (
    <div
      style={{
        backgroundColor: bg,
        minHeight: "100vh",
        display: "flex",
        color: text,
      }}
    >
      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        style={{
          width: 248,
          backgroundColor: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "24px 20px 20px" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: primary,
              lineHeight: 1.1,
            }}
          >
            SkipQ
          </div>
          <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>
            Queue Management
          </div>
        </div>

        <nav
          style={{
            flex: 1,
            padding: "8px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#fff" : muted,
                backgroundColor: isActive ? primary : "transparent",
                textDecoration: "none",
                transition: "background-color 0.15s ease",
              })}
            >
              <FontAwesomeIcon icon={item.icon} style={{ width: 16 }} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: 16, borderTop: `1px solid ${borderColor}` }}>
          <div
            style={{
              backgroundColor: dark ? "#0f172a" : "#f1f5f9",
              borderRadius: 10,
              padding: "10px 12px",
              marginBottom: 8,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: text }}>
              {user?.email?.split("@")[0] || "branch"}
            </div>
            <div style={{ fontSize: 11, color: muted, letterSpacing: 0.4 }}>
              BRANCH_MANAGER
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              padding: "8px 12px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "#ef4444",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN ---------------- */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: 64,
            borderBottom: `1px solid ${borderColor}`,
            backgroundColor: sidebarBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: text }}>
            Welcome back, {user?.email?.split("@")[0] || "branch"}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: 8,
                backgroundColor: dark ? "#0f172a" : "#f1f5f9",
                color: muted,
              }}
            >
              {sector === SECTORS.BANK ? "ATM Manager" : "Branch Manager"}
            </span>
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `1px solid ${borderColor}`,
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: text,
              }}
            >
              <FontAwesomeIcon icon={dark ? faSun : faMoon} />
            </button>
          </div>
        </header>

        {/* محتوى الصفحة الفرعية (Dashboard / Queue / ATMs / Settings) */}
        <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          <Outlet context={{ branchId: user?.branch_id, sector }} />
        </main>
      </div>
    </div>
  );
}

// نفس الـ tokens، متاحة لأي صفحة فرعية تحتاجها
export function useBranchManagerTheme() {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });

  useEffect(() => {
    const sync = () =>
      setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return {
    dark,
    bg: dark ? "#0f172a" : "#f8fafc",
    cardBg: dark ? "#1e293b" : "#ffffff",
    text: dark ? "#f1f5f9" : "#0f172a",
    muted: dark ? "#94a3b8" : "#64748b",
    borderColor: dark ? "#334155" : "#e2e8f0",
    inputBg: dark ? "#0f172a" : "#ffffff",
    primary: "#410fc7",
  };
}
