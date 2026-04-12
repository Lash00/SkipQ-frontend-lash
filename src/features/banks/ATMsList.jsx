import { useState, useMemo } from "react";
import SearchBar from "../../ui/SearchBar";
import ATMCard from "./component/ATMCard";
import { useOutletContext } from "react-router-dom";
import LocationPermissionModal from "../../ui/LocationPermissionModal";
const ATMS = [
  {
    id: 1,
    name: "ATM - بجوار المدينة الجامعية",
    area: "أسيوط - الجامعة",
    distance: "0.3km",
    distanceM: 300,
    bills: [50, 100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
  {
    id: 2,
    name: "ATM - بجوار مسجد عمر مكرم",
    area: "أسيوط - وسط البلد",
    distance: "0.8km",
    distanceM: 800,
    bills: [100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
  {
    id: 3,
    name: "ATM - أمام محطة قطار أسيوط",
    area: "أسيوط - المحطة",
    distance: "1.2km",
    distanceM: 1200,
    bills: [50, 100, 200],
    services: ["Withdraw"],
  },
  {
    id: 4,
    name: "ATM - شارع الجمهورية",
    area: "أسيوط - الجمهورية",
    distance: "1.8km",
    distanceM: 1800,
    bills: [50, 100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
];

const MAX_DISTANCE = 2000;

export default function ATMList({ bankName = "National Bank of Egypt" }) {
  const [searchName, setSearchName] = useState("");
  const [maxDistance, setMaxDistance] = useState(MAX_DISTANCE);
  const [sortOrder, setSortOrder] = useState("asc");
  const { dark } = useOutletContext();

  const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  const filtered = useMemo(() => {
    let list = ATMS.filter((a) => {
      const withinDistance = a.distanceM <= maxDistance;
      const matchesName = a.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      return withinDistance && matchesName;
    });

    if (sortOrder === "asc")
      return list.sort((a, b) => a.distanceM - b.distanceM);
    if (sortOrder === "desc")
      return list.sort((a, b) => b.distanceM - a.distanceM);
    return list;
  }, [maxDistance, searchName, sortOrder]);

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

        {/* Search Bar */}
        <SearchBar
          dark={dark}
          searchName={searchName}
          setSearchName={setSearchName}
          maxDistance={maxDistance}
          setMaxDistance={setMaxDistance}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          maxPossibleDistance={MAX_DISTANCE}
        />

        {filtered.length > 0 ? (
          filtered.map((atm) => <ATMCard key={atm.id} atm={atm} dark={dark} />)
        ) : (
          <div className={`text-center py-20 text-sm ${subText}`}>
            No ATMs found within {maxDistance}m.
          </div>
        )}
      </div>
    </div>
  );
}
