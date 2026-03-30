import Navbar from "../../ui/naveBar";
import themesMAP from "../../../themes/themes";
import { useState } from "react";
// import Footer from "./ui/footer";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import Footer from "../../ui/footer";

function HomePage() {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? false);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3 }}
      className="shadow-lg rounded-xl"
    >
      <div
        style={{
          background: dark
            ? themesMAP["light-main-bg"]
            : themesMAP["dark-main-bg"],
          minHeight: "100vh",
        }}
      >
        <Outlet context={{ dark, setDark }} />
      </div>
    </motion.div>
  );
}

export default HomePage;
