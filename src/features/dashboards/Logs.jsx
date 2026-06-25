// LogsPage.jsx  (page only — layout lives in DeveloperDashboard)

import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import themesMAP from "../../../themes/themes";

const logsData = [
  {
    id: 1,
    organization: "Banque Misr",
    chiefName: "Ahmed Karim",
    managersCount: 18,
    branchesCount: 142,
  },
  {
    id: 2,
    organization: "National Bank of Egypt",
    chiefName: "Fatima Hassan",
    managersCount: 26,
    branchesCount: 310,
  },
  {
    id: 3,
    organization: "Banque du Caire",
    chiefName: "Mohamed Ali",
    managersCount: 12,
    branchesCount: 102,
  },
  {
    id: 4,
    organization: "Arab African International Bank",
    chiefName: "Noor El-Din",
    managersCount: 9,
    branchesCount: 54,
  },
  {
    id: 5,
    organization: "Agricultural Bank of Egypt",
    chiefName: "Layla Mohammed",
    managersCount: 14,
    branchesCount: 88,
  },
];

export default function LogsPage() {
  const { dark } = useOutletContext();

  const text   = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const muted  = dark ? "#94a3b8"               : "#64748b";
  const cardBg = dark ? "#1e293b"               : "#ffffff";
  const border = dark ? "#334155"               : "#e2e8f0";

  return (
    <>
      {/* page header */}
      <div className="mb-5">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: text }}>
          Logs
        </h2>
        <p className="text-sm" style={{ color: muted }}>
          Organizations overview and management summary
        </p>
      </div>

      {/* desktop table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block rounded-2xl overflow-hidden border"
        style={{ backgroundColor: cardBg, borderColor: border }}
      >
        <div
          className="grid grid-cols-12 px-5 py-4 text-xs font-semibold border-b"
          style={{
            borderColor: border,
            backgroundColor: dark ? "#0f172a" : "#f8fafc",
            color: muted,
          }}
        >
          <div className="col-span-4">Organization</div>
          <div className="col-span-3">Chief Name</div>
          <div className="col-span-2">Managers</div>
          <div className="col-span-3">Branches</div>
        </div>

        {logsData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 px-5 py-4 border-b last:border-b-0 items-center"
            style={{ borderColor: border }}
          >
            <div className="col-span-4">
              <p className="font-medium text-sm" style={{ color: text }}>
                {item.organization}
              </p>
            </div>

            <div className="col-span-3">
              <p className="text-sm" style={{ color: text }}>
                {item.chiefName}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-sm font-semibold" style={{ color: text }}>
                {item.managersCount}
              </p>
            </div>

            <div className="col-span-3">
              <p className="text-sm font-semibold" style={{ color: text }}>
                {item.branchesCount}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* mobile cards */}
      <div className="md:hidden space-y-3">
        {logsData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border p-4"
            style={{ backgroundColor: cardBg, borderColor: border }}
          >
            <div className="mb-3">
              <p className="font-semibold text-base" style={{ color: text }}>
                {item.organization}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm" style={{ color: text }}>
                <span style={{ color: muted }}>Chief Name: </span>
                {item.chiefName}
              </p>
              <p className="text-sm" style={{ color: text }}>
                <span style={{ color: muted }}>Managers: </span>
                {item.managersCount}
              </p>
              <p className="text-sm" style={{ color: text }}>
                <span style={{ color: muted }}>Branches: </span>
                {item.branchesCount}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}