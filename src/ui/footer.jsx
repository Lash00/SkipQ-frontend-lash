import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import themesMAP from "../../themes/themes";

const productLinks = [
  // { name: "Features", href: "/how-it-works" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  // { name: "Careers", href: "/contact" },
  // { name: "Blog", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  // { name: "Cookie Policy", href: "/privacy-policy" },
];

export default function Footer({ dark }) {
  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];

  return (
    <div
      style={{
        minHeight: "50vh",
        backgroundColor: dark ? "#0f172a" : "#f4f5f7",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <div className="p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-16">
          {/* Brand */}
          <div>
            {/* Logo */}
            <div className="flex lg:flex-1 gap-3 items-center">
              <button
                type="button"
                style={{ backgroundColor: "rgb(65, 15, 199)" }}
                className="text-white rounded-xl border border-transparent shadow-xs font-medium text-sm px-4 py-2.5 "
              >
                <img
                  src="/public/images/whiteLogo.png"
                  alt="Connection Error"
                  className="w-full w-[50px]"
                />
              </button>
              <h1
                className="text-2xl font-bold"
                style={{
                  color: dark
                    ? themesMAP["text-light"]
                    : themesMAP["text-dark"],
                }}
              >
                SkipQ
              </h1>
            </div>
            <p className="text-md text-[#9e9fa1] w-[90%] mt-3">
              Smart queue management made simple. Save time, reduce stress.
            </p>
          </div>

          {/* Product */}
          <div>
            <h5 className="font-semibold" style={{ color: text }}>
              Product
            </h5>
            <ul className="mt-6 list-none text-[#9e9fa1] space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    className="hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-semibold" style={{ color: text }}>
              Company
            </h5>
            <ul className="mt-6 list-none text-[#9e9fa1] space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    className="hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-semibold" style={{ color: text }}>
              Legal
            </h5>
            <ul className="mt-6 list-none text-[#9e9fa1] space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    className="hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8">
          <hr style={{ borderColor: dark ? "#1e293b" : "#e2e8f0" }} />
          <div className="flex justify-between mt-8 flex-wrap gap-4">
            <p className="text-[#8c8d8f] text-sm">
              &copy; 2026 SkipQ. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <FontAwesomeIcon icon={faTwitter} color="#8c8d8f" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <FontAwesomeIcon icon={faLinkedin} color="#8c8d8f" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
