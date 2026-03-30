import { useEffect,useState } from "react";
import BankCard from "./component/BankCard";


function Banks({dark}) {
  const [banks,setBanks]=useState([]);
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null);
 
  useEffect(()=>{
    const fetchBanks=async()=>{
      const response=await fetch("http://localhost:8000/organization");
      const data=await response.json();
      console.log(data);
      setBanks(data);
      
    }
    fetchBanks();
  }, []);
  // const filtered = 
  //   () => banks.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
  
  const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
  // const textColor = dark ? "text-white" : "text-gray-900";
  // const subText = dark ? "text-gray-400" : "text-gray-500";
  return (
    <div className={`min-h-screen ${pageBg} px-4 py-12`}>
      <div className="max-w-5xl mx-auto">
 
        {/* Header */}
        <div className="mb-8">
        
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Select Your Bank</h1>
          <p className="text-slate-400 text-sm mt-1">ATM Machines · Find the nearest ATM</p>
        </div>
 
        {/* Search */}
        <div className="relative mb-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
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
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-blue-100 rounded-2xl text-slate-700 text-[15px]
                       placeholder-slate-300 outline-none
                       focus:border-blue-400 focus:ring-4 focus:ring-blue-100
                       transition-all duration-200 shadow-sm"
          />
        </div>
 
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {banks.length > 0 ? (
            banks.map((bank) => (
              <BankCard key={bank.id} bank={bank} onClick={setSelected} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-400 text-sm">
              No banks found for &quot;{search}&quot;
            </div>
          )}
        </div>
      </div>
 
      {/* Toast */}
      <div
        className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm font-medium
                    px-5 py-3 rounded-full shadow-xl whitespace-nowrap z-50
                    transition-all duration-500
                    ${selected ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
      >
        {selected && `✓ Selected: ${selected.name}`}
      </div>
    </div>
  )

  }
  


export default Banks;
