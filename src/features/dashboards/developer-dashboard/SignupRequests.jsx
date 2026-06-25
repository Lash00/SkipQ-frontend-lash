import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import themesMAP from "../../../../themes/themes";
import DetailsDrawer from "./DetailsDrawer";
import StatusBadge from "./StatusBadge";

const initialRequestsData = [
  {
    id: 1,
    organization: "Banque Misr",
    abbr: "BM",
    contact: "Ahmed Karim",
    email: "ahmed.karim@banquemisr.eg",
    phone: "+20 2 23651720",
    submittedBy: "Ahmed Karim",
    governorate: "Cairo",
    branches: 142,
    atms: 1250,
    submitted: "2026-07-15",
    status: "active",
    notes: "Major Egyptian bank, high-priority implementation",
  },
  {
    id: 2,
    organization: "National Bank of Egypt",
    abbr: "NBE",
    contact: "Fatima Hassan",
    email: "fatima.hassan@nbe.eg",
    phone: "+20 2 25760777",
    submittedBy: "Fatima Hassan",
    governorate: "Cairo",
    branches: 310,
    atms: 1800,
    submitted: "2026-07-05",
    status: "pending",
    notes: "Pending legal verification",
  },
  {
    id: 3,
    organization: "Banque du Caire",
    abbr: "BDC",
    contact: "Mohamed Ali",
    email: "mohamed.ali@banqueducaire.eg",
    phone: "+20 2 26789100",
    submittedBy: "Mohamed Ali",
    governorate: "Giza",
    branches: 102,
    atms: 560,
    submitted: "2026-07-10",
    status: "rejected",
    notes: "Missing compliance documents",
  },
  {
    id: 4,
    organization: "Arab African International Bank",
    abbr: "AAIB",
    contact: "Noor El-Din",
    email: "noor@aaib.eg",
    phone: "+20 2 25922000",
    submittedBy: "Noor El-Din",
    governorate: "Cairo",
    branches: 54,
    atms: 298,
    submitted: "2026-07-28",
    status: "suspended",
    notes: "Account suspended due to breach of service terms",
  },
  {
    id: 5,
    organization: "Agricultural Bank of Egypt",
    abbr: "ABE",
    contact: "Layla Mohammed",
    email: "layla.m@abeank.eg",
    phone: "+20 3 4820000",
    submittedBy: "Layla Mohammed",
    governorate: "Alexandria",
    branches: 88,
    atms: 430,
    submitted: "2026-07-18",
    status: "pending",
    notes: "Awaiting infrastructure readiness confirmation",
  },
];

const tabs = [
  { key: "all", label: "All Requests" },
  { key: "pending", label: "Pending Review" },
  { key: "active", label: "Active" },
  { key: "rejected", label: "Rejected" },
  { key: "suspended", label: "Suspended" },
];

export default function SignupRequestsWithDrawerPage() {
  const { dark } = useOutletContext();

  const [requests, setRequests] = useState(initialRequestsData);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const muted = dark ? "#94a3b8" : "#64748b";
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#e2e8f0";
  const primary = "#410fc7";

  const filteredData = useMemo(() => {
    return requests.filter((item) => {
      const matchTab = activeTab === "all" || item.status === activeTab;
      const matchSearch =
        item.organization.toLowerCase().includes(search.toLowerCase()) ||
        item.abbr.toLowerCase().includes(search.toLowerCase());

      return matchTab && matchSearch;
    });
  }, [requests, activeTab, search]);

  const countForTab = (tabKey) =>
    tabKey === "all"
      ? requests.length
      : requests.filter((i) => i.status === tabKey).length;

  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );

    setSelected((prev) =>
      prev && prev.id === id ? { ...prev, status: newStatus } : prev
    );
  };

  return (
    <>
      <div className="mb-5">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: text }}>
          Signup Requests
        </h2>
        <p className="text-sm" style={{ color: muted }}>
          Manage and review organization signup requests
        </p>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-5">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                style={{
                  backgroundColor: isActive ? primary : dark ? "#334155" : "#e2e8f0",
                  color: isActive ? "#ffffff" : dark ? "#e2e8f0" : "#475569",
                }}
              >
                {tab.label} ({countForTab(tab.key)})
              </button>
            );
          })}
        </div>

        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl border w-full sm:min-w-[260px]"
          style={{ backgroundColor: cardBg, borderColor: border }}
        >
          <Search size={16} style={{ color: muted }} />
          <input
            type="text"
            placeholder="Search by name, abbreviation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
            style={{ color: text }}
          />
        </div>
      </div>

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
          <div className="col-span-3">Contact</div>
          <div className="col-span-2">Governorate</div>
          <div className="col-span-2">Submitted</div>
          <div className="col-span-1">Action</div>
        </div>

        {filteredData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 px-5 py-4 border-b last:border-b-0 items-center"
            style={{ borderColor: border }}
          >
            <div className="col-span-4">
              <p className="font-semibold text-base" style={{ color: text }}>
                {item.organization}
              </p>
              <p className="text-xs" style={{ color: muted }}>
                {item.abbr}
              </p>
            </div>

            <div className="col-span-3">
              <p className="font-medium text-sm" style={{ color: text }}>
                {item.contact}
              </p>
              <p className="text-xs break-all" style={{ color: muted }}>
                {item.email}
              </p>
            </div>

            <div className="col-span-2 text-sm" style={{ color: text }}>
              {item.governorate}
            </div>

            <div className="col-span-2 space-y-2">
              <div className="text-sm" style={{ color: text }}>
                {item.submitted}
              </div>
              <StatusBadge status={item.status} />
            </div>

            <div className="col-span-1">
              <button
                onClick={() => setSelected(item)}
                className="text-sm font-semibold"
                style={{ color: primary }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="md:hidden space-y-3">
        {filteredData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border p-4"
            style={{ backgroundColor: cardBg, borderColor: border }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-semibold text-base" style={{ color: text }}>
                  {item.organization}
                </p>
                <p className="text-xs" style={{ color: muted }}>
                  {item.abbr}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm" style={{ color: text }}>
                <span style={{ color: muted }}>Contact: </span>
                {item.contact}
              </p>
              <p className="text-xs break-all" style={{ color: muted }}>
                {item.email}
              </p>
              <p className="text-sm" style={{ color: text }}>
                <span style={{ color: muted }}>Governorate: </span>
                {item.governorate}
              </p>
              <p className="text-sm" style={{ color: text }}>
                <span style={{ color: muted }}>Submitted: </span>
                {item.submitted}
              </p>
            </div>

            <button
              onClick={() => setSelected(item)}
              className="text-sm font-semibold"
              style={{ color: primary }}
            >
              View
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs" style={{ color: muted }}>
          Showing {filteredData.length} of {requests.length} results
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-xl border text-sm"
            style={{ backgroundColor: cardBg, borderColor: border, color: text }}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 rounded-xl border text-sm"
            style={{ backgroundColor: cardBg, borderColor: border, color: text }}
          >
            Next
          </button>
        </div>
      </div>

      <DetailsDrawer
        item={selected}
        onClose={() => setSelected(null)}
        dark={dark}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}