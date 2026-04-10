import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useOutletContext } from "react-router-dom";
import BranchMap from "../../ui/BranchMap";

// Fix Leaflet default icon broken in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function StatusBadge({ active }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${active ? "bg-green-500" : "bg-red-400"}`} />
      <span className={`text-base font-semibold ${active ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
        {active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

function QueueStatus({ count, dark }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
      dark
        ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
        : "bg-[rgb(65,15,199)]/10 border-[rgb(65,15,199)]/20 text-[rgb(65,15,199)]"
    }`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70">Queue Status</p>
        <p className="font-bold text-base leading-tight">{count} people waiting</p>
      </div>
    </div>
  );
}

function DenominationBadge({ amount, currency = "EGP", dark }) {
  return (
    <div className={`flex items-center justify-center border rounded-xl py-3 text-sm font-semibold transition-colors cursor-default ${
      dark
        ? "bg-gray-800 border-gray-700 text-gray-300 hover:border-violet-400 hover:text-violet-400"
        : "bg-white border-slate-200 text-slate-700 hover:border-[rgb(65,15,199)]/50 hover:text-[rgb(65,15,199)]"
    }`}>
      {amount} {currency}
    </div>
  );
}

function WithdrawForm({ onSubmit, dark }) {
  const [amount, setAmount] = useState("");
  const [showAmt, setShowAmt] = useState(false);

  return (
    <div className={`rounded-2xl border shadow-sm p-6 mt-12 ${
      dark
        ? "bg-gray-900 border-gray-700"
        : "bg-white border-gray-200"
    }`}>
      <h2 className={`text-lg font-bold mb-4 ${dark ? "text-white" : "text-gray-900"}`}>
        Withdraw Cash
      </h2>

      <label className={`block text-sm mb-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>
        Amount (EGP)
      </label>

      <div className="relative mb-4">
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium ${
          dark ? "text-gray-500" : "text-slate-400"
        }`}>
          $
        </span>

        <input
          type={showAmt ? "text" : "password"}
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full pl-9 pr-11 py-3 border rounded-xl text-sm outline-none transition-all
            focus:border-[rgb(65,15,199)] focus:ring-4 focus:ring-[rgb(65,15,199)]/10 ${
            dark
              ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-600"
              : "bg-gray-50 border-gray-300 text-gray-800 placeholder:text-slate-300"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowAmt(!showAmt)}
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-[rgb(65,15,199)] ${
            dark ? "text-gray-500" : "text-slate-400"
          }`}
        >
          {showAmt ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      <button
        onClick={() => amount && onSubmit?.(amount)}
        className="w-full py-3.5 bg-[rgb(65,15,199)] hover:bg-[rgb(85,35,219)]
                   active:bg-[rgb(45,5,179)] active:scale-[0.98] text-white
                   text-sm font-semibold rounded-xl transition-all duration-150"
      >
        Proceed to Withdrawal
      </button>
    </div>
  );
}

const ATM_DATA = {
  name: "ATM Details",
  bankName: "Banque Misr",
  location: "Cairo Downtown, Egypt",
  latitude: 30.0444,
  longitude: 31.2357,
  active: true,
  queueCount: 4,
  denominations: [200, 100, 50, 20],
};

export default function ATMDetails({ atm = ATM_DATA }) {
  const { dark } = useOutletContext();
  const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${pageBg} px-4 py-10`}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-start gap-3 mb-8">
          <button className="mt-1 text-slate-400 hover:text-[rgb(65,15,199)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div>
            <h1 className={`text-2xl font-bold ${textColor}`}>{atm.name}</h1>
            <p className={`text-sm ${subText} mt-0.5`}>{atm.bankName}</p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* Left column */}
          <div className="flex-1">
            <div className="relative">
              <BranchMap
                location={{ latitude: ATM_DATA.latitude, longitude: ATM_DATA.longitude }}
                dark={dark}
              />
              <div className="relative -mt-6 mx-4 z-[1001]">
                <WithdrawForm
                  onSubmit={(amt) => alert(`Withdrawing ${amt} EGP`)}
                  dark={dark}
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className={`w-full lg:w-72 rounded-2xl border shadow-sm p-5 flex flex-col gap-5 self-start ${
            dark
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-slate-200"
          }`}>
            <StatusBadge active={atm.active} />
            <QueueStatus count={atm.queueCount} dark={dark} />
            <div>
              <h3 className={`text-sm font-bold mb-3 ${dark ? "text-gray-200" : "text-slate-700"}`}>
                Denominations
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {atm.denominations.map((d) => (
                  <DenominationBadge key={d} amount={d} currency="EGP" dark={dark} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}