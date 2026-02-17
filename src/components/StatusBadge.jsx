const styles = {
  idle: "bg-slate-800 text-slate-400 border-slate-700",
  loading: "bg-amber-950 text-amber-300 border-amber-800 animate-pulse",
  success: "bg-emerald-950 text-emerald-300 border-emerald-800",
  error: "bg-red-950 text-red-300 border-red-800",
};

const icons = { idle: "○", loading: "◌", success: "✓", error: "✕" };

export default function StatusBadge({ status, message }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${styles[status]}`}
    >
      <span>{icons[status]}</span>
      {message}
    </span>
  );
}