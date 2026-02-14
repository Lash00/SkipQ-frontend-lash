import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import themesMAP from "../../../themes/themes";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

export default function Footer({ dark }) {
  return (
    <div
      className=""
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
        <div
          className="p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2  lg:grid-cols-4  mt-16"
          // style={{ background: "red" }}
        >
          <div>
            <div className="flex lg:flex-1 gap-3 items-baseline">
              <button
                type="button"
                className={`text-white rounded-xl bg-brand box-border border border-transparent bg-blue-700 hover:bg-blue-600 focus:ring-blue-300 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none`}
              >
                S
              </button>
              <h1
                className="text-2xl font-bold"
                style={{
                  color: dark
                    ? themesMAP["text-light"]
                    : themesMAP["text-dark"],
                }}
              >
                Skip Q
              </h1>
            </div>
            <p className="text-md text-[#9e9fa1] w-[90%] mt-3">
              Smart queue management made simple. Save time, reduce stress.
            </p>
          </div>
          {/* the column 2 */}
          <div>
            <h5
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
              }}
            >
              Product
            </h5>
            <ul className="mt-6 list-none text-[#9e9fa1]">
              <li className="mt-3 hover:text-blue-600">Features</li>
              <li className="mt-3 hover:text-blue-600">Services</li>
              <li className="mt-3 hover:text-blue-600">Pricing</li>
              <li className="mt-3 hover:text-blue-600">FAQ</li>
            </ul>
          </div>
          {/* the column 3 */}

          <div>
            <h5
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
              }}
            >
              Company
            </h5>
            <ul className="mt-6 list-none text-[#9e9fa1]">
              <li className="mt-3 hover:text-blue-600">About Us</li>
              <li className="mt-3 hover:text-blue-600">Blog</li>
              <li className="mt-3 hover:text-blue-600">Careers</li>
              <li className="mt-3 hover:text-blue-600">Contact</li>
            </ul>
          </div>
          {/* the column 4 */}

          <div>
            <h5
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
              }}
            >
              Legal
            </h5>
            <ul className="mt-6 list-none text-[#9e9fa1]">
              <li className="mt-3 hover:text-blue-600">Privacy Policy</li>
              <li className="mt-3 hover:text-blue-600">Terms of Service</li>
              <li className="mt-3 hover:text-blue-600">Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8">
          <hr />
          <div className="flex justify-between  mt-8 flex-wrap">
            <p className="text-[#8c8d8f]">
              &copy;2026 SkipO. All rights reserved.
            </p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <FontAwesomeIcon icon={faTwitter} color="#8c8d8f" />
              <FontAwesomeIcon icon={faLinkedin} color="#8c8d8f" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
