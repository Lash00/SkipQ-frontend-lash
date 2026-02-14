import Navbar from "./naveBar";
import themesMAP from "../../../themes/themes";
import { useState } from "react";
import Landing from "./landing";
import ImageSlider from "./imageSlider";
import Services from "./Services";
import Footer from "./footer";
import { motion } from "framer-motion";

function HomePage() {
  const [dark, setDark] = useState(false);
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
          // `linear-gradient(to top right, #ff80b5,${themesMAP["dark-main-bg"]},${themesMAP["dark-main-bg"]})`,
          minHeight: "100vh",
        }}
      >
        <Navbar dark={dark} setDark={setDark} />
        <Landing dark={dark} />
        <ImageSlider dark={dark} />
        <Services dark={dark} />
        <Footer dark={dark} />
      </div>
    </motion.div>
  );
}

export default HomePage;
