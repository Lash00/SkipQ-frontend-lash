import {
  X,
  Mail,
  Phone,
  MapPin,
  Building2,
  TriangleAlert,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";
import themesMAP from "../../../../themes/themes";
import { motion, AnimatePresence } from "framer-motion";
import StatusBadge from "./StatusBadge";

function DetailsDrawer({ item, onClose, dark, onStatusChange }) {
  if (!item) return null;

  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const muted = dark ? "#94a3b8" : "#64748b";
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#e2e8f0";
  const primary = "#410fc7";

  const handleApprove = () => {
    onStatusChange(item.id, "active");
  };

  const handleReject = () => {
    onStatusChange(item.id, "rejected");
  };

  const handleSuspend = () => {
    onStatusChange(item.id, "suspended");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/45" onClick={onClose} />

        <motion.div
          initial={{ x: 420 }}
          animate={{ x: 0 }}
          exit={{ x: 420 }}
          transition={{ duration: 0.25 }}
          className="absolute top-0 right-0 h-full w-full max-w-full sm:max-w-[370px] overflow-y-auto"
          style={{ backgroundColor: cardBg }}
        >
          <div
            className="p-5 border-b sticky top-0 z-10"
            style={{
              borderColor: border,
              backgroundColor: cardBg,
            }}
          >
            <div className="flex items-center justify-between">
              <h3
                className="text-lg sm:text-xl font-bold"
                style={{ color: text }}
              >
                Organization Details
              </h3>
              <button onClick={onClose} style={{ color: muted }}>
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-4">
              <StatusBadge status={item.status} />
            </div>

            <div className="mb-5">
              <h4
                className="text-xl sm:text-2xl font-bold mb-1"
                style={{ color: text }}
              >
                {item.organization}
              </h4>
              <p className="text-sm" style={{ color: muted }}>
                {item.abbr}
              </p>
            </div>

            <div className="space-y-5">
              <div className="pb-5 border-b" style={{ borderColor: border }}>
                <div className="flex gap-3 mb-4">
                  <Mail size={16} style={{ color: primary }} />
                  <div>
                    <p className="text-xs" style={{ color: muted }}>
                      Contact Email
                    </p>
                    <p
                      className="font-semibold text-sm break-all"
                      style={{ color: text }}
                    >
                      {item.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mb-4">
                  <Phone size={16} style={{ color: primary }} />
                  <div>
                    <p className="text-xs" style={{ color: muted }}>
                      Phone
                    </p>
                    <p className="font-semibold text-sm" style={{ color: text }}>
                      {item.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Building2 size={16} style={{ color: primary }} />
                  <div>
                    <p className="text-xs" style={{ color: muted }}>
                      Submitted By
                    </p>
                    <p className="font-semibold text-sm" style={{ color: text }}>
                      {item.submittedBy}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pb-5 border-b" style={{ borderColor: border }}>
                <div className="flex gap-3 mb-4">
                  <MapPin size={16} style={{ color: primary }} />
                  <div>
                    <p className="text-xs" style={{ color: muted }}>
                      Governorate
                    </p>
                    <p className="font-semibold text-sm" style={{ color: text }}>
                      {item.governorate}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs" style={{ color: muted }}>
                      Branches
                    </p>
                    <p
                      className="text-xl sm:text-2xl font-bold"
                      style={{ color: primary }}
                    >
                      {item.branches}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs" style={{ color: muted }}>
                      ATMs
                    </p>
                    <p
                      className="text-xl sm:text-2xl font-bold"
                      style={{ color: primary }}
                    >
                      {item.atms}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pb-5 border-b" style={{ borderColor: border }}>
                <p className="text-xs mb-2" style={{ color: muted }}>
                  Submitted Date
                </p>
                <p className="font-semibold text-sm" style={{ color: text }}>
                  {item.submitted}
                </p>
              </div>

              <div className="pb-5 border-b" style={{ borderColor: border }}>
                <p className="text-xs mb-2" style={{ color: muted }}>
                  Notes
                </p>
                <div
                  className="rounded-xl p-3 text-sm"
                  style={{
                    backgroundColor: dark ? "#0f172a" : "#f1f5f9",
                    color: text,
                  }}
                >
                  {item.notes}
                </div>
              </div>

              {item.status === "pending" && (
                <div className="pt-2 space-y-3">
                  <button
                    onClick={handleApprove}
                    className="w-full rounded-xl py-3 font-semibold text-white flex items-center justify-center gap-2 text-sm"
                    style={{ backgroundColor: "#16a34a" }}
                  >
                    <CheckCircle size={16} />
                    Approve Request
                  </button>

                  <button
                    onClick={handleReject}
                    className="w-full rounded-xl py-3 font-semibold text-white flex items-center justify-center gap-2 text-sm"
                    style={{ backgroundColor: "#dc2626" }}
                  >
                    <XCircle size={16} />
                    Reject Request
                  </button>
                </div>
              )}

              {item.status === "active" && (
                <div className="pt-2 space-y-3">
                  <button
                    className="w-full rounded-xl py-3 font-semibold text-white flex items-center justify-center gap-2 text-sm"
                    style={{ backgroundColor: primary }}
                  >
                    <Send size={16} />
                    Send Password Setup Email
                  </button>

                  <button
                    onClick={handleSuspend}
                    className="w-full rounded-xl py-3 font-semibold text-white flex items-center justify-center gap-2 text-sm"
                    style={{ backgroundColor: "#f97316" }}
                  >
                    <TriangleAlert size={16} />
                    Suspend Account
                  </button>
                </div>
              )}

              {item.status === "suspended" && (
                <div
                  className="rounded-xl p-4 border"
                  style={{
                    backgroundColor: "#fff7ed",
                    borderColor: "#fdba74",
                    color: "#c2410c",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <TriangleAlert size={18} />
                    <div>
                      <p className="font-semibold mb-1 text-sm">
                        Suspension Reason
                      </p>
                      <p className="text-sm">
                        Account suspended due to breach of service terms
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {item.status === "rejected" && (
                <div
                  className="rounded-xl p-4 border"
                  style={{
                    backgroundColor: "#fef2f2",
                    borderColor: "#fecaca",
                    color: "#b91c1c",
                  }}
                >
                  <p className="font-semibold mb-1 text-sm">Rejected Request</p>
                  <p className="text-sm">
                    This organization request has been rejected. No action is
                    available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DetailsDrawer;