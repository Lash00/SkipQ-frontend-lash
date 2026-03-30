import { useState, useMemo } from "react";
import SortDropdown from "./component/SortDropdown";
import ATMCard from "./component/ATMCard";
import DistanceSlider from "./component/DistanceSlider";

const ATMS = [
  {
    id: 1,
    name: "NBE Downtown",
    area: "Cairo Downtown",
    distance: "0.3km",
    distanceM: 300,
    bills: [50, 100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
  {
    id: 2,
    name: "NBE Zamalek",
    area: "Zamalek",
    distance: "0.8km",
    distanceM: 800,
    bills: [100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
  {
    id: 3,
    name: "NBE Heliopolis",
    area: "Heliopolis",
    distance: "1.2km",
    distanceM: 1200,
    bills: [50, 100, 200],
    services: ["Withdraw"],
  },
  {
    id: 4,
    name: "NBE Maadi",
    area: "Maadi",
    distance: "1.8km",
    distanceM: 1800,
    bills: [50, 100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
];


export default function ATMList({ bankName = "National Bank of Egypt" }) {
  const [distance, setDistance] = useState(2000);
  const [sort, setSort]         = useState("nearest");

  const filtered = useMemo(() => {
    const list = ATMS.filter((a) => a.distanceM <= distance);
    if (sort === "nearest")  return [...list].sort((a, b) => a.distanceM - b.distanceM);
    if (sort === "farthest") return [...list].sort((a, b) => b.distanceM - a.distanceM);
    if (sort === "name")     return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [distance, sort]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* Page Header */}
        <div className="flex items-center gap-2 mb-6">
          <button className="text-slate-400 hover:text-blue-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">
            ATM Machines –&nbsp;<span className="text-blue-600">{bankName}</span>
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-end justify-between gap-4">
          <DistanceSlider
            value={distance}
            min={100}
            max={2000}
            onChange={setDistance}
          />
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        
        {filtered.length > 0 ? (
          filtered.map((atm) => (
            <ATMCard
              key={atm.id}
              atm={atm}
            />
          ))
        ) : (
          <div className="text-center py-20 text-slate-400 text-sm">
            No ATMs found within {distance}m.
          </div>
        )}
      </div>

    </div>
  );
}