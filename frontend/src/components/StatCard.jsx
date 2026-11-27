export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-blue/25 to-brand-violet/25 text-brand-lilac">
          <Icon size={16} />
        </span>
        {label}
      </div>
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  )
}
