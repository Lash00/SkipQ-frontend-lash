// import { useState, useEffect } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// import { NavLink, useNavigate, Outlet } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGauge,
//   faBuilding,
//   faVideo,
//   faUserGear,
//   faMoneyBillTransfer,
//   faGear,
//   faRightFromBracket,
//   faMoon,
//   faSun,
// } from "@fortawesome/free-solid-svg-icons";
// import useAuth from "../../../../contexts/useAuth";
// import { SECTORS } from "../../../../../data/mockData";

// /**
//  * SuperAdminLayout.jsx
//  * -----------------------------------------------------------------------
//  * Shared shell for every Super Admin screen: sidebar nav + topbar.
//  * Mirrors the layout from the reference screenshot 1:1, with:
//  *   - "Reports" renamed/replaced -> "Camera Config"
//  *   - "Users" renamed/replaced   -> "Managers"
//  *   - a new "ATMs" link, shown ONLY when sector === "bank"
//  *
//  * Dark/light is read from localStorage("isDark"), same key used by the
//  * rest of the app (e.g. Login.jsx), and kept in sync across tabs via the
//  * "storage" event — exactly like the pattern already in Login.jsx.
//  * -----------------------------------------------------------------------
//  */

// const NAV_BASE = "/dashboards/super-admin";

// export default function SuperAdminLayout({ pageTitle }) {
//   const { user, logout, sector } = useAuth();
//   const navigate = useNavigate();

//   const [dark, setDark] = useState(() => {
//     return JSON.parse(localStorage.getItem("isDark") ?? "false");
//   });

//   useEffect(() => {
//     const sync = () =>
//       setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
//     window.addEventListener("storage", sync);
//     return () => window.removeEventListener("storage", sync);
//   }, []);

//   const toggleDark = () => {
//     const next = !dark;
//     setDark(next);
//     localStorage.setItem("isDark", JSON.stringify(next));
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   // ---- Theme tokens (kept inline to match the existing app convention) ----
//   const bg = dark ? "#0f172a" : "#f8fafc";
//   const sidebarBg = dark ? "#1e293b" : "#ffffff";
//   const text = dark ? "#f1f5f9" : "#0f172a";
//   const muted = dark ? "#94a3b8" : "#64748b";
//   const borderColor = dark ? "#334155" : "#e2e8f0";
//   const primary = "#410fc7";
//   const activeBg = dark ? "rgba(65,15,199,0.18)" : "rgba(65,15,199,0.08)";

//   const navItems = [
//     { to: `${NAV_BASE}`, label: "Dashboard", icon: faGauge, end: true },
//     { to: `${NAV_BASE}/branches`, label: "Branches", icon: faBuilding },
//     { to: `${NAV_BASE}/cameras`, label: "Camera Config", icon: faVideo },
//     { to: `${NAV_BASE}/managers`, label: "Managers", icon: faUserGear },
//     ...(sector === SECTORS.BANK
//       ? [{ to: `${NAV_BASE}/atms`, label: "ATMs", icon: faMoneyBillTransfer }]
//       : []),
//     { to: `${NAV_BASE}/settings`, label: "Settings", icon: faGear },
//   ];

//   const sectorLabel =
//     sector === SECTORS.BANK
//       ? "Bank Owner"
//       : sector === SECTORS.CIVIL_REGISTRY
//         ? "Civil Registry"
//         : "Super Admin";

//   return (
//     <div
//       style={{
//         backgroundColor: bg,
//         minHeight: "100vh",
//         display: "flex",
//         color: text,
//       }}
//     >
//       {/* ---------------- SIDEBAR ---------------- */}
//       <aside
//         style={{
//           width: 248,
//           backgroundColor: sidebarBg,
//           borderRight: `1px solid ${borderColor}`,
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "100vh",
//           flexShrink: 0,
//         }}
//       >
//         <div style={{ padding: "24px 20px 20px" }}>
//           <div
//             style={{
//               fontSize: 20,
//               fontWeight: 700,
//               color: primary,
//               lineHeight: 1.1,
//             }}
//           >
//             SkipQ
//           </div>
//           <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>
//             Queue Management
//           </div>
//         </div>

//         <nav
//           style={{
//             flex: 1,
//             padding: "8px 12px",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           {navItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               end={item.end}
//               style={({ isActive }) => ({
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 padding: "10px 14px",
//                 borderRadius: 10,
//                 fontSize: 14,
//                 fontWeight: isActive ? 600 : 500,
//                 color: isActive ? primary : muted,
//                 backgroundColor: isActive ? activeBg : "transparent",
//                 textDecoration: "none",
//                 transition: "background-color 0.15s ease",
//               })}
//             >
//               <FontAwesomeIcon icon={item.icon} style={{ width: 16 }} />
//               {item.label}
//             </NavLink>
//           ))}
//         </nav>

//         <div style={{ padding: 16, borderTop: `1px solid ${borderColor}` }}>
//           <div
//             style={{
//               backgroundColor: dark ? "#0f172a" : "#f1f5f9",
//               borderRadius: 10,
//               padding: "10px 12px",
//               marginBottom: 8,
//             }}
//           >
//             <div style={{ fontSize: 13, fontWeight: 600, color: text }}>
//               {user?.email}
//             </div>
//             <div style={{ fontSize: 11, color: muted, letterSpacing: 0.4 }}>
//               {sectorLabel.toUpperCase()}
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               width: "100%",
//               padding: "8px 12px",
//               borderRadius: 8,
//               fontSize: 13,
//               fontWeight: 600,
//               color: "#ef4444",
//               background: "transparent",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             <FontAwesomeIcon icon={faRightFromBracket} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* ---------------- MAIN ---------------- */}
//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           minWidth: 0,
//         }}
//       >
//         {/* Topbar */}
//         <header
//           style={{
//             height: 64,
//             borderBottom: `1px solid ${borderColor}`,
//             backgroundColor: sidebarBg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "0 24px",
//             flexShrink: 0,
//           }}
//         >
//           <div style={{ fontSize: 15, fontWeight: 600, color: text }}>
//             Welcome back, {user?.email?.split("@")[0]}
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <span
//               style={{
//                 fontSize: 12,
//                 fontWeight: 600,
//                 padding: "6px 12px",
//                 borderRadius: 8,
//                 backgroundColor: dark ? "#0f172a" : "#f1f5f9",
//                 color: muted,
//               }}
//             >
//               {sectorLabel}
//             </span>
//             <button
//               onClick={toggleDark}
//               aria-label="Toggle dark mode"
//               style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: "50%",
//                 border: `1px solid ${borderColor}`,
//                 background: "transparent",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: text,
//               }}
//             >
//               <FontAwesomeIcon icon={dark ? faSun : faMoon} />
//             </button>
//           </div>
//         </header>

//         {/* Page content */}
//         <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
//           {pageTitle && (
//             <div style={{ marginBottom: 24 }}>
//               <h1
//                 style={{
//                   fontSize: 28,
//                   fontWeight: 700,
//                   color: text,
//                   margin: 0,
//                 }}
//               >
//                 {pageTitle.title}
//               </h1>
//               {pageTitle.subtitle && (
//                 <p style={{ fontSize: 14, color: muted, marginTop: 4 }}>
//                   {pageTitle.subtitle}
//                 </p>
//               )}
//             </div>
//           )}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// // Exported so child pages can reuse the exact same theme tokens
// export function useSuperAdminTheme() {
//   const [dark, setDark] = useState(() => {
//     return JSON.parse(localStorage.getItem("isDark") ?? "false");
//   });

//   useEffect(() => {
//     const sync = () =>
//       setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
//     window.addEventListener("storage", sync);
//     return () => window.removeEventListener("storage", sync);
//   }, []);

//   return {
//     dark,
//     bg: dark ? "#0f172a" : "#f8fafc",
//     cardBg: dark ? "#1e293b" : "#ffffff",
//     text: dark ? "#f1f5f9" : "#0f172a",
//     muted: dark ? "#94a3b8" : "#64748b",
//     borderColor: dark ? "#334155" : "#e2e8f0",
//     inputBg: dark ? "#0f172a" : "#ffffff",
//     primary: "#410fc7",
//   };
// }
import { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faBuilding,
  faVideo,
  faUserGear,
  faMoneyBillTransfer,
  faGear,
  faRightFromBracket,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import useAuth from "../../../../contexts/useAuth";
import { SECTORS } from "../../../../../data/mockData";

const NAV_BASE = "/superDashboard";

export default function SuperAdminLayout({ pageTitle }) {
  const { user, logout, sector } = useAuth();
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

  const bg = dark ? "#0f172a" : "#f8fafc";
  const sidebarBg = dark ? "#1e293b" : "#ffffff";
  const text = dark ? "#f1f5f9" : "#0f172a";
  const muted = dark ? "#94a3b8" : "#64748b";
  const borderColor = dark ? "#334155" : "#e2e8f0";
  const primary = "#410fc7";
  const activeBg = dark ? "rgba(65,15,199,0.18)" : "rgba(65,15,199,0.08)";

  const navItems = [
    {
      to: NAV_BASE,
      label: "Dashboard",
      icon: faGauge,
      end: true,
    },
    {
      to: `${NAV_BASE}/branches`,
      label: "Branches",
      icon: faBuilding,
    },
    {
      to: `${NAV_BASE}/cameras`,
      label: "Camera Config",
      icon: faVideo,
    },
    {
      to: `${NAV_BASE}/managers`,
      label: "Managers",
      icon: faUserGear,
    },
    ...(sector === SECTORS.BANK
      ? [
          {
            to: `${NAV_BASE}/atms`,
            label: "ATMs",
            icon: faMoneyBillTransfer,
          },
        ]
      : []),
    // {
    //   to: `${NAV_BASE}/settings`,
    //   label: "Settings",
    //   icon: faGear,
    // },
  ];

  const sectorLabel =
    sector === SECTORS.BANK
      ? "Bank Owner"
      : sector === SECTORS.CIVIL_REGISTRY
        ? "Civil Registry"
        : "Super Admin";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: bg,
        color: text,
      }}
    >
      {/* Sidebar */}

      <aside
        style={{
          width: 250,
          background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 24 }}>
          <h2
            style={{
              color: primary,
              margin: 0,
            }}
          >
            SkipQ
          </h2>

          <small style={{ color: muted }}>Queue Management</small>
        </div>

        <nav
          style={{
            flex: 1,
            padding: 12,
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
                textDecoration: "none",
                padding: "10px 14px",
                marginBottom: 6,
                borderRadius: 10,
                color: isActive ? primary : muted,
                background: isActive ? activeBg : "transparent",
                fontWeight: isActive ? 600 : 500,
              })}
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div
          style={{
            padding: 16,
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: dark ? "#0f172a" : "#f1f5f9",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {user?.email}
            </div>

            <small style={{ color: muted }}>{sectorLabel}</small>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            height: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
            borderBottom: `1px solid ${borderColor}`,
            background: sidebarBg,
          }}
        >
          <div>Welcome back, {user?.email?.split("@")[0]}</div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>{sectorLabel}</span>

            <button
              onClick={toggleDark}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `1px solid ${borderColor}`,
                background: "transparent",
                cursor: "pointer",
                color: text,
              }}
            >
              <FontAwesomeIcon icon={dark ? faSun : faMoon} />
            </button>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            padding: 28,
            overflowY: "auto",
          }}
        >
          {pageTitle && (
            <div style={{ marginBottom: 24 }}>
              <h1>{pageTitle.title}</h1>

              {pageTitle.subtitle && (
                <p style={{ color: muted }}>{pageTitle.subtitle}</p>
              )}
            </div>
          )}

          {/* صفحات الـ Nested Routes هتظهر هنا */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function useSuperAdminTheme() {
  const [dark, setDark] = useState(() =>
    JSON.parse(localStorage.getItem("isDark") ?? "false"),
  );

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
