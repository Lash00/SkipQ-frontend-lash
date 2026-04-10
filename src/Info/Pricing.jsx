import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../themes/themes";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for individuals who want to skip waiting.",
    features: [
      { text: "View nearby branches", included: true },
      { text: "Live queue count", included: true },
      { text: "Basic map directions", included: true },
      { text: "1 saved favorite", included: true },
      { text: "ATM availability", included: false },
      { text: "Custom search radius", included: false },
      { text: "Priority notifications", included: false },
    ],
    highlight: false,
    cta: "Get Started",
    ctaLink: "/registration-guidelines",
  },
  {
    name: "Pro",
    price: "49",
    period: "per month",
    description: "For power users who need real-time intelligence.",
    features: [
      { text: "View nearby branches", included: true },
      { text: "Live queue count", included: true },
      { text: "Advanced map + directions", included: true },
      { text: "Unlimited saved favorites", included: true },
      { text: "ATM availability & limits", included: true },
      { text: "Custom search radius", included: true },
      { text: "Priority notifications", included: false },
    ],
    highlight: true,
    cta: "Start Pro",
    ctaLink: "/registration-guidelines",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations managing multiple branches at scale.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Branch Manager dashboard", included: true },
      { text: "Super Admin panel", included: true },
      { text: "Camera & sensor config", included: true },
      { text: "Analytics & reports", included: true },
      { text: "Custom search radius", included: true },
      { text: "Priority notifications", included: true },
    ],
    highlight: false,
    cta: "Contact Sales",
    ctaLink: "/contact",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Pricing() {
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
      <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full mb-6"
            style={{ backgroundColor: dark ? "#1e293b" : "#ede9fe", color: "#410fc7" }}>
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: text }}>
            Simple, transparent pricing
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: muted }}>
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible"
              viewport={{ once: true }} variants={fadeUp}
              className="rounded-2xl p-8"
              style={{
                backgroundColor: plan.highlight ? "rgb(65, 15, 199)" : cardBg,
                boxShadow: plan.highlight
                  ? "0 8px 40px rgba(65,15,199,0.4)"
                  : dark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.07)",
                transform: plan.highlight ? "scale(1.04)" : "scale(1)",
              }}>
              <h3 className="text-lg font-bold mb-1"
                style={{ color: plan.highlight ? "#fff" : text }}>{plan.name}</h3>
              <p className="text-sm mb-6" style={{ color: plan.highlight ? "#c4b5fd" : muted }}>
                {plan.description}
              </p>
              <div className="flex items-end gap-1 mb-8">
                {plan.price !== "Custom" && (
                  <span className="text-sm" style={{ color: plan.highlight ? "#c4b5fd" : muted }}>EGP</span>
                )}
                <span className="text-4xl font-black"
                  style={{ color: plan.highlight ? "#fff" : text }}>{plan.price}</span>
                {plan.period && (
                  <span className="text-sm mb-1" style={{ color: plan.highlight ? "#c4b5fd" : muted }}>
                    /{plan.period}
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={feat.included ? faCheck : faXmark}
                      style={{ color: feat.included ? (plan.highlight ? "#a5f3fc" : "#410fc7") : (plan.highlight ? "#c4b5fd" : muted) }}
                    />
                    <span className="text-sm"
                      style={{ color: plan.highlight ? (feat.included ? "#fff" : "#c4b5fd") : (feat.included ? text : muted) }}>
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>
              <NavLink to={plan.ctaLink}>
                <button className="w-full rounded-xl font-semibold py-3 transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: plan.highlight ? "#fff" : "rgb(65, 15, 199)",
                    color: plan.highlight ? "rgb(65, 15, 199)" : "#fff",
                  }}>
                  {plan.cta}
                </button>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
