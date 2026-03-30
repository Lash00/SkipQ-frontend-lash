const SORT_OPTIONS = [
  { value: "nearest",  label: "Nearest First" },
  { value: "farthest", label: "Farthest First" },
  { value: "name",     label: "Name A–Z" },
];
 
function SortDropdown({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Sort By</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium
                     pl-3 pr-9 py-2.5 rounded-xl outline-none cursor-pointer
                     focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default SortDropdown;