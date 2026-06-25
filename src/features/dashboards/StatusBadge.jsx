export default function StatusBadge({ status }) {
  const styles = {
    active: { background: "#dcfce7", color: "#16a34a", label: "active" },
    pending: { background: "#fef3c7", color: "#ca8a04", label: "pending" },
    rejected: { background: "#fee2e2", color: "#dc2626", label: "rejected" },
    suspended: { background: "#e2e8f0", color: "#475569", label: "suspended" },
  };

  const current = styles[status];

  return (
    <span
      className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold capitalize inline-block"
      style={{
        backgroundColor: current.background,
        color: current.color,
      }}
    >
      {current.label}
    </span>
  );
}