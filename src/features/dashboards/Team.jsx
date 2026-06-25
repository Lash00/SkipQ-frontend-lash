// DevelopmentTeamPage.jsx  (page only — layout lives in DeveloperDashboard)

import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import themesMAP from "../../../themes/themes";

function StatusBadge({ status }) {
  const styles = {
    active:   { background: "#dcfce7", color: "#16a34a", label: "active" },
    inactive: { background: "#e2e8f0", color: "#64748b", label: "inactive" },
  };
  const current = styles[status];
  return (
    <span
      className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold capitalize inline-block"
      style={{ backgroundColor: current.background, color: current.color }}
    >
      {current.label}
    </span>
  );
}

const teamMembers = [
  { id: 1, name: "Karim Ibrahim",  email: "karim@skipq.dev",  role: "Lead Developer",    status: "active",   joinDate: "1/15/2023" },
  { id: 2, name: "Leila Hassan",   email: "leila@skipq.dev",  role: "DevOps Engineer",   status: "active",   joinDate: "3/20/2023" },
  { id: 3, name: "Ahmed Youssef",  email: "ahmed@skipq.dev",  role: "Backend Engineer",  status: "active",   joinDate: "5/10/2023" },
  { id: 4, name: "Sarah Mohamed",  email: "sarah@skipq.dev",  role: "QA Engineer",       status: "inactive", joinDate: "4/1/2023"  },
];

export default function DevelopmentTeamPage() {
  const { dark } = useOutletContext();

  const text    = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const muted   = dark ? "#94a3b8"               : "#64748b";
  const cardBg  = dark ? "#1e293b"               : "#ffffff";
  const border  = dark ? "#334155"               : "#e2e8f0";
  const primary = "#410fc7";

  return (
    <>
      {/* page header */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: text }}>
            Development Team
          </h2>
          <p className="text-sm" style={{ color: muted }}>
            {teamMembers.length} team members
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white w-full sm:w-auto"
          style={{ backgroundColor: primary }}
        >
          <Plus size={16} />
          Add Member
        </button>
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
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Join Date</div>
        </div>

        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-12 px-5 py-4 border-b last:border-b-0 items-center"
            style={{ borderColor: border }}
          >
            <div className="col-span-3">
              <p className="font-medium text-sm" style={{ color: text }}>{member.name}</p>
            </div>
            <div className="col-span-3">
              <p className="text-sm break-all" style={{ color: text }}>{member.email}</p>
            </div>
            <div className="col-span-3">
              <p className="text-sm" style={{ color: text }}>{member.role}</p>
            </div>
            <div className="col-span-1">
              <StatusBadge status={member.status} />
            </div>
            <div className="col-span-2">
              <p className="text-sm" style={{ color: text }}>{member.joinDate}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* mobile cards */}
      <div className="md:hidden space-y-3">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border p-4"
            style={{ backgroundColor: cardBg, borderColor: border }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-semibold text-base" style={{ color: text }}>{member.name}</p>
                <p className="text-xs break-all" style={{ color: muted }}>{member.email}</p>
              </div>
              <StatusBadge status={member.status} />
            </div>

            <div className="space-y-2">
              <p className="text-sm" style={{ color: text }}>
                <span style={{ color: muted }}>Role: </span>{member.role}
              </p>
              <p className="text-sm" style={{ color: text }}>
                <span style={{ color: muted }}>Join Date: </span>{member.joinDate}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}