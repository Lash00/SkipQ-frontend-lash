import {Link} from "react-router-dom"
import BillBadge from "./BillBadge";
import ServiceBadge from "./ServiceBadge";

const ATM_DATA = {
name: "ATM Details",
bankName: "Banque Misr",
location: "Cairo Downtown, Egypt",
lat: 30.0444,
lng: 31.2357,
active: true,         
queueCount: 4,        
denominations: [200, 100, 50, 20],  
};
function ATMCard({ atm }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-slate-800">{atm.name}</h2>
        <div className="flex items-center gap-1 mt-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-slate-400 text-xs">{atm.area}</span>
        </div>
        <p className="text-slate-400 text-xs mt-0.5">{atm.distance} away</p>
      </div>

      {/* Bills & Services */}
      <div className="flex gap-8 mb-5">
        {/* Bills */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Bills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(atm.bills || []).map((b) => (
              <BillBadge key={b} amount={b} />
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Services</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(atm.services || []).map((s) => (
              <ServiceBadge key={s} label={s} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link to={`/banks/${atm.bankName}/atms/${atm.id}`}>
      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-150"
      >
        View Details &amp; Location
      </button>
        </Link>
    </div>
  );
}
export default ATMCard;