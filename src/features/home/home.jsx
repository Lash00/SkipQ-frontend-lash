import Navbar from "./naveBar";
import themesMAP from "../../../themes/themes";
import { useState } from "react";
import Landing from "./landing";
import ImageSlider from "./imageSlider";
function HomePage() {
  const [dark, setDark] = useState(false);
  return (
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
    </div>
  );
}

export default HomePage;
