import { useOutletContext } from "react-router-dom";
import Landing from "./homePage/landing";
import ImageSlider from "./homePage/imageSlider";
import Services from "../../services/Services";
import Navbar from "../../ui/naveBar";
import Footer from "../../ui/footer";

function HomeContent() {
  const { dark, setDark } = useOutletContext();

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <Landing dark={dark} />
      <ImageSlider dark={dark} />
      <Services dark={dark} />
      <Footer dark={dark} />
    </>
  );
}

export default HomeContent;
