function BillBadge({ amount }) {
  return (
    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">
      {amount}
    </span>
  );
}

export default BillBadge;