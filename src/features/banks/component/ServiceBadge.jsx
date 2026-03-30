function ServiceBadge({ label }) {
  const isDeposit = label.toLowerCase() === "deposit";
  return (
    <span
      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border
        ${isDeposit
          ? "bg-green-50 text-green-600 border-green-200"
          : "bg-blue-50 text-blue-600 border-blue-200"
        }`}
    >
      {isDeposit ? (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      )}
      {label}
    </span>
  );
}

export default ServiceBadge;