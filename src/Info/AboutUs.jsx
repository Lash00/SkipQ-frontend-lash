import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faBullseye, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../themes/themes";

const values = [
  {
    icon: faBullseye,
    title: "Our Mission",
    text: "Eliminate wasted time in physical queues by giving citizens real-time visibility into service availability — before they leave home.",
  },
  {
    icon: faEye,
    title: "Our Vision",
    text: "A world where every government service and bank branch operates transparently, and no one stands in line without knowing exactly what to expect.",
  },
  {
    icon: faHeart,
    title: "Our Values",
    text: "Transparency, accessibility, and respect for people's time. We build for everyone — from students to seniors — with a clean, intuitive experience.",
  },
];

const stats = [
  { value: "120+", label: "Branches Connected" },
  { value: "40k+", label: "Daily Users" },
  { value: "3 min", label: "Avg. Time Saved" },
  { value: "98%", label: "Queue Accuracy" },
];

export default function AboutUs() {
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
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ color: text }}>
            We hate waiting in line.
            <br />
            <span style={{ color: "#410fc7" }}>So we fixed it.</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: muted }}>
            SkipQ was born out of frustration — too many hours lost in queues at banks and government offices. We built the tool we always wished existed.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: cardBg, boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.07)" }}>
              <p className="text-3xl font-black" style={{ color: "#410fc7" }}>{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: muted }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.55 }}
              className="rounded-2xl p-8"
              style={{ backgroundColor: cardBg, boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.07)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: dark ? "#0f172a" : "#ede9fe" }}>
                <FontAwesomeIcon icon={val.icon} style={{ color: "#410fc7" }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: text }}>{val.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>{val.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
