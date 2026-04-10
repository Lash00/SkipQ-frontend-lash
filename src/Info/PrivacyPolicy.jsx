import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../themes/themes";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect only what's necessary to deliver the service. This includes:
• Location data: Used in real time to find nearby branches. Not stored after the session.
• Account data: Name, email, and password hash when you register.
• Usage data: Anonymous analytics (page visits, feature usage) to improve the product.
• Branch Manager / Admin data: Organization name, branch details, and camera configuration.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `Your data is used exclusively to:
• Display nearby service branches and their queue status.
• Authenticate your account and enforce role-based access.
• Improve app performance through anonymized analytics.
• Send service notifications (only with your consent).`,
  },
  {
    title: "3. Location Data",
    content: `Location access is requested in-app and used only to find branches within your chosen radius. We do not store, sell, or share GPS coordinates. You can revoke location access at any time through your browser or device settings.`,
  },
  {
    title: "4. Data Sharing",
    content: `We do not sell your data. We share limited data only with:
• Cloud hosting providers (for app infrastructure).
• Analytics tools (anonymized, no PII).
We do not share with advertisers or third-party marketers.`,
  },
  {
    title: "5. Data Retention",
    content: `Account data is kept as long as your account is active. You may request deletion at any time by contacting support@skipq.app. Anonymous usage data may be retained for up to 24 months.`,
  },
  {
    title: "6. Security",
    content: `We use industry-standard encryption (TLS in transit, AES-256 at rest). Passwords are hashed and never stored in plaintext. We conduct regular security reviews.`,
  },
  {
    title: "7. Your Rights",
    content: `You have the right to:
• Access the personal data we hold about you.
• Request correction of inaccurate data.
• Request deletion of your account and associated data.
• Withdraw consent for notifications at any time.
Contact us at support@skipq.app for any of the above.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this policy periodically. We'll notify registered users by email for significant changes. Continued use of SkipQ after changes constitutes acceptance.`,
  },
];

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-extrabold mb-3" style={{ color: text }}>Privacy Policy</h1>
          <p className="text-sm" style={{ color: muted }}>Last updated: January 2026</p>
        </motion.div>
      </section>

      {/* Sections */}
      <section className="lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-6">
        {sections.map((sec, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
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
