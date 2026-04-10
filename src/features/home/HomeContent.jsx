import Landing from "./homePage/landing";
import ImageSlider from "./homePage/imageSlider";
import Services from "../../services/Services";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomeContent() {
  const { dark } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo === "services") {
      setTimeout(() => {
        document
          .getElementById("services")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      navigate(".", { replace: true, state: {} });
    }
  }, [location.state]);

  return (
    <>
      <Landing dark={dark} />
      <ImageSlider dark={dark} />
      <Services dark={dark} />
    </>
  );
}

export default HomeContent;
