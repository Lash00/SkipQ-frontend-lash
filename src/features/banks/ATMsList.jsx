import { useState, useMemo } from "react";
import SortDropdown from "./component/SortDropdown";
import ATMCard from "./component/ATMCard";
import DistanceSlider from "./component/DistanceSlider";
import { useOutletContext } from "react-router-dom";

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
  const [sort, setSort] = useState("nearest");
  const { dark } = useOutletContext();

  const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  const filtered = useMemo(() => {
    const list = ATMS.filter((a) => a.distanceM <= distance);
    if (sort === "nearest")  return [...list].sort((a, b) => a.distanceM - b.distanceM);
    if (sort === "farthest") return [...list].sort((a, b) => b.distanceM - a.distanceM);
    if (sort === "name")     return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [distance, sort]);

  return (
    <div className={`min-h-screen ${pageBg} px-4 py-10`}>
      <div className="w-[90%] mx-auto space-y-4">

        {/* Page Header */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className={`text-lg font-bold ${textColor}`}>
            ATM Machines –&nbsp;
            <span className="text-[rgb(65,15,199)]">{bankName}</span>
          </h1>
        </div>

        {/* Filter Bar */}
        <div className={`rounded-2xl border shadow-sm p-5 flex items-end justify-between gap-4 ${
          dark
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-slate-200"
        }`}>
          <DistanceSlider
            value={distance}
            min={100}
            max={2000}
            onChange={setDistance}
            dark={dark}
          />
          <SortDropdown value={sort} onChange={setSort} dark={dark} />
        </div>

        {filtered.length > 0 ? (
          filtered.map((atm) => (
            <ATMCard key={atm.id} atm={atm} dark={dark} />
          ))
        ) : (
          <div className={`text-center py-20 text-sm ${subText}`}>
            No ATMs found within {distance}m.
          </div>
        )}

      </div>
    </div>
  );
}