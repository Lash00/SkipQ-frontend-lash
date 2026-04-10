import { Link } from "react-router-dom";
import BillBadge from "./BillBadge";
import ServiceBadge from "./ServiceBadge";

function ATMCard({ atm, dark }) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm transition-all duration-200 ${
      dark
        ? "bg-gray-900 border-gray-700 hover:border-violet-500/40 hover:shadow-gray-900"
        : "bg-white border-slate-200 hover:shadow-md hover:border-[rgb(65,15,199)]/40"
    }`}>
      {/* Header */}
      <div className="mb-4">
        <h2 className={`text-base font-bold ${dark ? "text-white" : "text-slate-800"}`}>
          {atm.name}
        </h2>
        <div className="flex items-center gap-1 mt-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className={`text-xs ${dark ? "text-gray-400" : "text-slate-400"}`}>{atm.area}</span>
        </div>
        <p className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-slate-400"}`}>
          {atm.distance} away
        </p>
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
            <span className={`text-[10px] font-bold tracking-widest uppercase ${
              dark ? "text-gray-500" : "text-slate-400"
            }`}>Bills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(atm.bills || []).map((b) => (
              <BillBadge key={b} amount={b} dark={dark} />
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
            <span className={`text-[10px] font-bold tracking-widest uppercase ${
              dark ? "text-gray-500" : "text-slate-400"
            }`}>Services</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(atm.services || []).map((s) => (
              <ServiceBadge key={s} label={s} dark={dark} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link to={`/banks/${atm.bankName}/atms/${atm.id}`}>
        <button className="w-full py-3 bg-[rgb(65,15,199)] hover:bg-[rgb(85,35,219)] active:bg-[rgb(45,5,179)] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-150">
          View Details &amp; Location
        </button>
      </Link>
    </div>
  );
}

export default ATMCard;