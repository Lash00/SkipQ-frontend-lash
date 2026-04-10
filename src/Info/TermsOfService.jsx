import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../themes/themes";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using SkipQ, you agree to these Terms of Service. If you do not agree, please discontinue use immediately. These terms apply to all users: visitors, registered users, Branch Managers, and Super Admins.`,
  },
  {
    title: "2. Description of Service",
    content: `SkipQ provides real-time queue information for nearby service branches (civil registry offices, banks, ATMs). The service includes live queue counts, branch availability, ATM details, and map-based navigation. We do not guarantee service availability at all times.`,
  },
  {
    title: "3. User Accounts",
    content: `You are responsible for maintaining the confidentiality of your account credentials. You must not share your account with others. Users who register as Branch Managers or Super Admins represent that they have authorization from their organization to do so.`,
  },
  {
    title: "4. Acceptable Use",
    content: `You agree not to:
• Use SkipQ to collect or scrape data about other users or branches.
• Attempt to reverse-engineer or tamper with the app or its APIs.
• Use automated bots or scripts to access the service.
• Impersonate a branch, organization, or official entity.
• Submit false data through the Branch Manager or Admin interfaces.`,
  },
  {
    title: "5. Branch Manager & Admin Responsibilities",
    content: `Branch Managers and Super Admins are responsible for the accuracy of data they configure (services, camera feeds, operational status). Misrepresentation of queue or service data that harms users may result in account suspension.`,
  },
  {
    title: "6. Location Data",
    content: `Location access is entirely optional but required for the core features of SkipQ. You can revoke this permission at any time. We do not use location data for advertising or tracking purposes.`,
  },
  {
    title: "7. Disclaimer of Warranties",
    content: `SkipQ is provided "as is." Queue counts are estimates based on sensor and camera data and may not be perfectly accurate. We are not liable for decisions made based on displayed queue information, travel times, or branch availability status.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the extent permitted by applicable law, SkipQ and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.`,
  },
  {
    title: "9. Termination",
    content: `We reserve the right to suspend or terminate accounts that violate these terms, at our discretion, without prior notice. You may delete your account at any time through settings or by contacting support@skipq.app.`,
  },
  {
    title: "10. Governing Law",
    content: `These terms are governed by the laws of the Arab Republic of Egypt. Any disputes shall be resolved through the competent courts of Cairo.`,
  },
];

export default function TermsOfService() {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });

  useEffect(() => {
    const sync = () =>
      setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const bg = dark ? "#0f172a" : "#f4f5f7";
  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const muted = dark ? "#94a3b8" : "#64748b";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50"
        style={{ backgroundColor: bg, borderBottom: `1px solid ${dark ? "#1e293b" : "#e2e8f0"}` }}>
        <nav className="flex items-center justify-between p-4 lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex gap-3 items-baseline">
            <button type="button" style={{ backgroundColor: "rgb(65, 15, 199)" }}
              className="text-white rounded-xl border border-transparent shadow-xs font-medium text-sm px-4 py-2.5">
              S
            </button>
            <h1 className="text-2xl font-bold" style={{ color: text }}>Skip Q</h1>
          </NavLink>
          <button onClick={() => setDark((prev) => {
            const next = !prev;
            localStorage.setItem("isDark", JSON.stringify(next));
            return next;
          })}>
            <FontAwesomeIcon icon={dark ? faSun : faMoon} size="lg" style={{ color: text }} />
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full mb-6"
            style={{ backgroundColor: dark ? "#1e293b" : "#ede9fe", color: "#410fc7" }}>
            Legal
          </span>
          <h1 className="text-4xl font-extrabold mb-3" style={{ color: text }}>Terms of Service</h1>
          <p className="text-sm" style={{ color: muted }}>Last updated: January 2026</p>
        </motion.div>
      </section>

      {/* Sections */}
      <section className="lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-6">
        {sections.map((sec, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
            className="rounded-2xl p-6"
            style={{ backgroundColor: cardBg, boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: text }}>{sec.title}</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: muted }}>{sec.content}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
