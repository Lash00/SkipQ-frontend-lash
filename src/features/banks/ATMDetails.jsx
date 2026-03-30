import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
 
// Fix Leaflet default icon broken in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
 
// ─────────────────────────────────────────────
// Reusable: Status Badge
// ─────────────────────────────────────────────
function StatusBadge({ active }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${active ? "bg-green-500" : "bg-red-400"}`} />
      <span className={`text-base font-semibold ${active ? "text-slate-800" : "text-red-500"}`}>
        {active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
 
// ─────────────────────────────────────────────
// Reusable: Queue Status Card
// ─────────────────────────────────────────────
function QueueStatus({ count }) {
  return (
    <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <div>
        <p className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">Queue Status</p>
        <p className="text-blue-700 font-bold text-base leading-tight">{count} people waiting</p>
      </div>
    </div>
  );
}
 
// ─────────────────────────────────────────────
// Reusable: Denomination Badge
// ─────────────────────────────────────────────
function DenominationBadge({ amount, currency = "EGP" }) {
  return (
    <div className="flex items-center justify-center border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 bg-white hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
      {amount} {currency}
    </div>
  );
}
 
// ─────────────────────────────────────────────
// Reusable: ATM Map (react-leaflet)
// ─────────────────────────────────────────────
function ATMMap({ lat, lng, label}) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: 340 }}>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
 
      {/* Floating action buttons over map */}
     
    </div>
  );
}
 
// ─────────────────────────────────────────────
// Reusable: Withdraw Form
// ─────────────────────────────────────────────
function WithdrawForm({ onSubmit }) {
  const [amount, setAmount]   = useState("");
  const [showAmt, setShowAmt] = useState(false);
 
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-12">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Withdraw Cash</h2>
 
      <label className="block text-sm text-slate-500 mb-2">Amount (EGP)</label>
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
        <input
          type={showAmt ? "text" : "password"}
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full pl-9 pr-11 py-3 border border-slate-200 rounded-xl text-slate-700 text-sm
                     placeholder-slate-300 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
        />
        <button
          type="button"
          onClick={() => setShowAmt(!showAmt)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
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
        className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-150"
      >
        Proceed to Withdrawal
      </button>
    </div>
  );
}
 
// ─────────────────────────────────────────────
// Sample Data  (replace with your fetched data)
// ─────────────────────────────────────────────
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
 
// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function ATMDetails({ atm = ATM_DATA }) {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
 
        {/* Header */}
        <div className="flex items-start gap-3 mb-8">
          <button className="mt-1 text-slate-400 hover:text-blue-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{atm.name}</h1>
            <p className="text-slate-400 text-sm mt-0.5">{atm.bankName}</p>
          </div>
        </div>
 
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-5">
 
          {/* Left column: Map with Withdraw Card overlapping bottom */}
          <div className="flex-1">
            {/* Wrapper that allows the form card to sit on top of the map */}
            <div className="relative">
              <ATMMap
                lat={atm.lat}
                lng={atm.lng}
                label={atm.location}
                onDirections={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${atm.lat},${atm.lng}`)}
                onCall={() => alert("Calling ATM support…")}
              />
 
              {/* Withdraw form overlapping the bottom of the map */}
              <div className="relative -mt-6 mx-4 z-[1001]">
                <WithdrawForm onSubmit={(amt) => alert(`Withdrawing ${amt} EGP`)} />
              </div>
            </div>
          </div>
 
          {/* Right column: Info Panel */}
          <div className="w-full lg:w-72 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-5 self-start ">
            <StatusBadge active={atm.active} />
            <QueueStatus count={atm.queueCount} />
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3">Denominations</h3>
              <div className="grid grid-cols-2 gap-2">
                {atm.denominations.map((d) => (
                  <DenominationBadge key={d} amount={d} currency="EGP" />
                ))}
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}