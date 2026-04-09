import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPaperPlane,
  faShield,
  faClock,
  faBolt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../../themes/themes";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function ApplicationSubmitted({
  dark = true,
  orgName = "your organization",
}) {
  const textColor = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const bgColor = dark ? themesMAP["dark-main-bg"] : themesMAP["light-main-bg"];

  const steps = [
    {
      number: 1,
      title: "Application Sent",
      description: "Your organization details have been received and recorded",
      icon: faPaperPlane,
      active: true,
    },
    {
      number: 2,
      title: "Security Review",
      description:
        "Our team is verifying your organization information and requirements",
      icon: faShield,
      active: true,
    },
    {
      number: 3,
      title: "Final Approval",
      description:
        "Your organization will be activated and you'll receive confirmation via email",
      icon: faCircleCheck,
      active: false,
    },
  ];

  return (
    <div
      style={{ color: textColor, minHeight: "100vh" }}
      className="flex items-center justify-center px-4 py-10 rounded-xl"
    >
      <motion.div
        className="w-full max-w-md shadow-lg shadow-gray-400 p-5 rounded-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* ---- Icon + Title ---- */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-4"
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-white"
              size="2x"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold mb-2 text-black"
          >
            Application Submitted!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-sm"
            style={{ color: dark ? "#94a3b8" : "#64748b" }}
          >
            Thank you for registering{" "}
            <span
              className="font-semibold"
              style={{ color: "rgb(65, 15, 199)" }}
            >
              {orgName}
            </span>
          </motion.p>
        </div>

        {/* ---- Steps ---- */}
        <div className="mb-6 px-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + index * 0.4, // كل خطوة بعد التانية بـ 0.4 ثانية
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white"
                  style={{
                    background: step.active ? "rgb(65, 15, 199)" : "#94a3b8",
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.9 + index * 0.4, // بتظهر بعد الـ circle بشوية
                      ease: "easeOut",
                      transformOrigin: "top",
                    }}
                    className="w-0.5 mt-1 origin-top"
                    style={{
                      height: "40px",
                      background: step.active
                        ? "rgb(65, 15, 199)"
                        : dark
                          ? "#334155"
                          : "#cbd5e1",
                    }}
                  />
                )}
              </div>

              {/* Step Text */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.75 + index * 0.4,
                  ease: "easeOut",
                }}
                className="pb-6"
              >
                <p
                  className="font-bold text-sm mb-0.5"
                  style={{
                    color: dark
                      ? themesMAP["text-dark"]
                      : themesMAP["text-light"],
                  }}
                >
                  {step.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: dark ? "#94a3b8" : "#64748b" }}
                >
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ---- Progress Bar ---- */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.9, ease: "easeOut" }}
          className="w-full h-1 rounded-full mb-6 origin-left"
          style={{
            background: "linear-gradient(to right, #2563eb, rgb(65, 15, 199))",
          }}
        />

        {/* ---- Info Cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 2.1 }}
            className="rounded-xl p-4 shadow-xl"
            style={{ background: bgColor, border: "0.5px solid #e4e4e4" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon
                icon={faClock}
                className="text-blue-800"
                size="lg"
              />
              <p
                className="font-semibold text-sm"
                style={{
                  color: dark
                    ? themesMAP["text-dark"]
                    : themesMAP["text-light"],
                }}
              >
                Expected Timeline
              </p>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: dark ? "#94a3b8" : "#64748b" }}
            >
              You'll typically receive approval within{" "}
              <span
                className="font-bold"
                style={{
                  color: dark
                    ? themesMAP["text-dark"]
                    : themesMAP["text-light"],
                }}
              >
                24-48 hours
              </span>
              . We'll notify you via email once complete.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 2.25 }}
            className="rounded-xl p-4 shadow-xl"
            style={{ background: bgColor, border: "0.5px solid #e4e4e4" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon
                icon={faBolt}
                className="text-blue-800"
                size="lg"
              />
              <p
                className="font-semibold text-sm"
                style={{
                  color: dark
                    ? themesMAP["text-dark"]
                    : themesMAP["text-light"],
                }}
              >
                What's Next
              </p>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: dark ? "#94a3b8" : "#64748b" }}
            >
              Check your email for updates and set up your organization profile
              once approved.
            </p>
          </motion.div>
        </div>

        {/* ---- Back Button ---- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 2.5 }}
          className="w-full text-center mt-3"
        >
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-[15px] transition hover:opacity-70"
            style={{
              color: !dark ? themesMAP["text-light"] : themesMAP["text-dark"],
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Home
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
