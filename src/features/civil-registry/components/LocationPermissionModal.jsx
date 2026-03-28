import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

function LocationPermissionModal({
  dark,
  visible,
  onAllow,
  onSkip,
  locationLoading,
}) {
  const bg = dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";
  const overlayBg = dark ? "bg-black/70" : "bg-black/40";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${overlayBg} backdrop-blur-sm`}
        >
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`rounded-2xl border shadow-xl p-6 w-full max-w-sm ${bg}`}
          >
            {/* LOADING STATE — بعد ما يضغط Allow */}
            {locationLoading ? (
              <div className="flex flex-col items-center justify-center py-6 gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.85,
                    ease: "linear",
                  }}
                  className="w-12 h-12 rounded-full border-4 border-[rgb(65,15,199)] border-t-transparent"
                />
                <p className={`text-base font-semibold ${textColor}`}>
                  Getting your location...
                </p>
                <p className={`text-sm text-center ${subText}`}>
                  Please allow location access in your browser
                </p>
              </div>
            ) : (
              /* NORMAL STATE */
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: "rgb(65,15,199)" }}
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      size="lg"
                      style={{ color: dark ? "white" : "rgb(65,15,199)" }}
                    />
                  </div>
                  <div>
                    <h2 className={`text-base font-bold ${textColor}`}>
                      Use your location?
                    </h2>
                    <p className={`text-xs ${subText}`}>
                      Find the nearest branches to you
                    </p>
                  </div>
                </div>

                <p className={`text-sm mb-5 leading-relaxed ${subText}`}>
                  We'll use your current location to sort branches by distance,
                  so you can find the closest one faster.
                </p>

                <div className="flex flex-col gap-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={onAllow}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: "rgb(65,15,199)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgb(85,35,219)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "rgb(65,15,199)")
                    }
                  >
                    Allow Location Access
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={onSkip}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold border transition
                      ${
                        dark
                          ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    Skip for now
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LocationPermissionModal;
