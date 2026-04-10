import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import themesMAP from "../../themes/themes";

const contactInfo = [
  { icon: faEnvelope, label: "Email", value: "support@skipq.app" },
  { icon: faPhone, label: "Phone", value: "+20 100 000 0000" },
  { icon: faLocationDot, label: "HQ", value: "Cairo, Egypt" },
];

export default function Contact() {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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
  const inputBg = dark ? "#0f172a" : "#f8fafc";
  const inputBorder = dark ? "#334155" : "#e2e8f0";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    color: text,
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    fontSize: "14px",
  };

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
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: text }}>
            Get in touch
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: muted }}>
            Have a question or want to bring SkipQ to your organization? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="space-y-5 mb-8">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ backgroundColor: cardBg, boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: dark ? "#0f172a" : "#ede9fe" }}>
                    <FontAwesomeIcon icon={item.icon} style={{ color: "#410fc7" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: muted }}>{item.label}</p>
                    <p className="font-medium" style={{ color: text }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: cardBg }}>
                <FontAwesomeIcon icon={faTwitter} style={{ color: muted }} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: cardBg }}>
                <FontAwesomeIcon icon={faLinkedin} style={{ color: muted }} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="rounded-2xl p-8"
              style={{ backgroundColor: cardBg, boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.07)" }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: text }}>Message sent!</h3>
                  <p style={{ color: muted }}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: muted }}>Name</label>
                      <input style={inputStyle} placeholder="Your name"
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: muted }}>Email</label>
                      <input style={inputStyle} type="email" placeholder="your@email.com"
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: muted }}>Subject</label>
                    <input style={inputStyle} placeholder="How can we help?"
                      value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: muted }}>Message</label>
                    <textarea style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
                      placeholder="Tell us more..."
                      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button onClick={handleSubmit}
                    style={{ backgroundColor: "rgb(65, 15, 199)" }}
                    className="w-full text-white rounded-xl font-semibold py-3 hover:opacity-90 transition-opacity">
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
