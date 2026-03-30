import { motion } from "framer-motion";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pagination({ currentPage, totalPages, onPageChange, dark }) {
  if (totalPages <= 1) return null;

  const subText = dark ? "text-gray-400" : "text-gray-500";
  const dotBase =
    "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer";
  const dotActive = "bg-[rgb(65,15,199)] scale-125";
  const dotInactive = dark
    ? "bg-gray-600 hover:bg-gray-400"
    : "bg-gray-300 hover:bg-gray-400";

  const arrowBtn = (disabled) =>
    `flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200 ${
      disabled
        ? dark
          ? "border-gray-700 text-gray-600 cursor-not-allowed"
          : "border-gray-200 text-gray-300 cursor-not-allowed"
        : dark
          ? "border-gray-600 text-gray-300 hover:border-[rgb(65,15,199)] hover:text-[rgb(65,15,199)]"
          : "border-gray-300 text-gray-600 hover:border-[rgb(65,15,199)] hover:text-[rgb(65,15,199)]"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4 mt-6 py-4"
    >
      {/* Prev Arrow */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowBtn(currentPage === 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>

      {/* Dot Indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            title={`Page ${page}`}
            className={`${dotBase} ${page === currentPage ? dotActive : dotInactive}`}
          />
        ))}
      </div>

      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={arrowBtn(currentPage === totalPages)}
      >
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </button>

      {/* Page Label */}
      <span className={`text-xs ${subText}`}>
        Page {currentPage} of {totalPages}
      </span>
    </motion.div>
  );
}

export default Pagination;
