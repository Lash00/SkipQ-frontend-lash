import { motion, AnimatePresence } from "framer-motion";
import BranchCard from "./BranchCard";

// Loading skeleton card
function SkeletonCard({ dark }) {
  const bg = dark ? "bg-gray-800" : "bg-gray-200";
  const shimmer = dark ? "bg-gray-700" : "bg-gray-300";
  return (
    <div
      className={`rounded-2xl p-4 ${bg} animate-pulse flex gap-4 items-center`}
    >
      <div className={`w-12 h-12 rounded-xl ${shimmer}`} />
      <div className="flex-1 space-y-2">
        <div className={`h-4 rounded ${shimmer} w-1/2`} />
        <div className={`h-3 rounded ${shimmer} w-1/3`} />
      </div>
      <div className={`h-6 w-16 rounded-full ${shimmer}`} />
    </div>
  );
}

function BranchList({ branches, dark, loading }) {
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  if (loading) {
    return (
      <div className="flex flex-col gap-2 mt-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <SkeletonCard dark={dark} />
          </motion.div>
        ))}
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 gap-3"
      >
        {/* <span className="text-5xl">🏢</span> */}
        <p className={`text-lg font-semibold ${textColor}`}>
          No branches found
        </p>
        <p className={`text-sm ${subText}`}>
          Try adjusting your search or distance filter
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-2">
        {branches.map((branch, index) => (
          <BranchCard
            key={branch.branch_id}
            branch={branch}
            index={index}
            dark={dark}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}

export default BranchList;
