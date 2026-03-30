function DistanceSlider({ value, min, max, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="w-48">
      <div className="flex items-center gap-1.5 mb-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="text-sm text-slate-600 font-medium">
          Distance: <span className="text-blue-600 font-semibold">{value}m</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #3b82f6 ${pct}%, #e2e8f0 ${pct}%)`,
        }}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-blue-600
                   [&::-webkit-slider-thumb]:shadow-md
                   [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <div className="flex justify-between text-[11px] text-slate-400 mt-1">
        <span>{min}m</span>
        <span>{max}m</span>
      </div>
    </div>
  );
}

export default DistanceSlider;