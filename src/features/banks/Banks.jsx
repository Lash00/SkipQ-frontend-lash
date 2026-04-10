import { useEffect, useState } from "react";
import BankCard from "./component/BankCard";
import { useOutletContext } from "react-router-dom";

function Banks() {
  const [banks, setBanks] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const { dark } = useOutletContext();
  useEffect(() => {
    const fetchBanks = async () => {
      const response = await fetch("http://localhost:8000/organization");
      const data = await response.json();
      console.log(data);
      setBanks(data);
    };
    fetchBanks();
  }, []);

  const pageBg    = dark ? "bg-gray-950"  : "bg-gray-50";
  const textColor = dark ? "text-white"   : "text-slate-900";
  const subText   = dark ? "text-gray-500" : "text-slate-400";

  const filtered = banks.filter((b) =>
    (b.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${pageBg} px-4 py-12`}>
      <div className="w-[90%] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold tracking-tight ${textColor}`}>
            Select Your Bank
          </h1>
          <p className={`text-sm mt-1 ${subText}`}>
            ATM Machines · Find the nearest ATM
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${
            dark ? "text-gray-600" : "text-slate-300"
          }`}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search banks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-11 pr-4 py-3.5 rounded-2xl text-[15px] outline-none transition-all duration-200 shadow-sm border ${
              dark
                ? "bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                : "bg-white border-blue-100 text-slate-700 placeholder-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            }`}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length > 0 ? (
            filtered.map((bank) => (
              <BankCard key={bank.id} bank={bank} onClick={setSelected} dark={dark} />
            ))
          ) : (
            <div className={`col-span-full text-center py-20 text-sm ${subText}`}>
              No banks found for &quot;{search}&quot;
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-7 left-1/2 -translate-x-1/2 text-sm font-medium
                    px-5 py-3 rounded-full shadow-xl whitespace-nowrap z-50
                    transition-all duration-500
                    ${dark ? "bg-gray-800 text-white" : "bg-slate-900 text-white"}
                    ${selected ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
      >
        {selected && `✓ Selected: ${selected.name}`}
      </div>
    </div>
  );
}

export default Banks;