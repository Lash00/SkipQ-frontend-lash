import { useRef } from "react";
import themesMAP from "../../../../themes/themes";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import waiting from "../../../../public/animation/Waiting.json";

export default function Landing({ dark }) {
  const lottieRef = useRef();

  return (
    <div
      className="p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8"
      style={{
        minHeight: "90vh",
        backgroundColor: dark
          ? themesMAP["light-main-bg"]
          : themesMAP["dark-main-bg"],
      }}
    >
      <div
        className="grid lg:grid-cols-2 md:grid-cols-1 gap-6 h-full"
        style={{ minHeight: "inherit" }}
      >
        {/* Left - Text */}
        <div className="flex justify-center flex-col gap-4">
          <h1
            className="text-5xl font-bold md:text-6xl lg:text-6xl xl:text-7xl"
            style={{
              color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
            }}
          >
            Skip the Queue, Save Your Time
          </h1>

          <p className="text-xl text-[#64748b]" style={{ width: "70%" }}>
            Real-time crowd monitoring across branches. Check wait times before
            you go and make smarter choices about where and when to visit.
          </p>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              style={{ backgroundColor: "rgb(65, 15, 199)" }}
              className="text-white rounded-xl border border-transparent shadow-xs font-medium text-sm px-4 py-2.5 hover:opacity-90 focus:outline-none transition-opacity"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Check Services
            </button>

            <button
              type="button"
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
                border: "2px solid",
                borderColor: dark
                  ? themesMAP["text-light"]
                  : themesMAP["text-dark"],
              }}
              className="rounded-xl shadow-xs font-medium text-sm px-4 py-2.5 focus:outline-none hover:opacity-80 transition-opacity"
            >
              <NavLink to="/how-it-works">Learn More</NavLink>
            </button>
          </div>
        </div>

        {/* Right - Lottie بدل الصورة */}
        <div className="flex items-stretch">
          <div
            className="w-full rounded-lg overflow-hidden"
            style={{ maxHeight: "90vh", height: "100%" }}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={waiting}
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
