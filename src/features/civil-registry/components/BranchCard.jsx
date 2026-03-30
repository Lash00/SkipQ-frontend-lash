import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function BranchCard({ branch, index, dark }) {
  const navigate = useNavigate();
  const cardBg = dark
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-200";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";
  const simulatedDistance = ((branch.branch_id * 0.37) % 5).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
      className={`rounded-2xl border p-5 shadow-sm mb-4 ${cardBg}`}
    >
      <div className="mb-3">
        <h2 className={`text-lg font-bold ${textColor}`}>
          {branch.branch_name}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <FontAwesomeIcon
            icon={faLocationDot}
            size="sm"
            style={{ color: dark ? "white" : "rgb(65,15,199)" }}
          />
          <span className={`text-sm ${subText}`}>{branch.branch_code}</span>
        </div>
        <span className={`text-xs mt-1 block ${subText}`}>
          {simulatedDistance} km away
        </span>
      </div>

      <div
        className={`border-t my-3 ${dark ? "border-gray-700" : "border-gray-100"}`}
      />

      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center justify-between w-full">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${subText}`}
          >
            Status
          </span>
          {branch.isActive ? (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
              Active
            </span>
          ) : (
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">
              Inactive
            </span>
          )}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(`/civil-registry/${branch.branch_id}`)}
        className="w-full py-2.5 rounded-xl text-sm font-semibold text-white tracking-wide"
        style={{ background: branch.isActive ? "rgb(65,15,199)" : "gray" }}
        // onMouseEnter={(e) =>
        //   (e.currentTarget.style.background = "rgb(85,35,219)")
        // }
        // onMouseLeave={(e) =>
        //   (e.currentTarget.style.background = "rgb(65,15,199)")
        // }
        disabled={branch.isActive ? false : true}
      >
        View Details &amp; Location &rarr;
      </motion.button>
    </motion.div>
  );
}

export default BranchCard;
