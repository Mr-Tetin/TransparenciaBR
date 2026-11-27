import { brl } from '../utils/format.js'

export default function CategoryBars({ titulo, dados, total, selecionado, onSelect, limite = 6 }) {
  const lista = dados.slice(0, limite)
  return (
    <div className="card p-5">
      <h3 className="mb-4 text-base font-semibold">{titulo}</h3>
      <ul className="space-y-3.5">
        {lista.map((d) => {
          const pct = total > 0 ? (d.valor / total) * 100 : 0
          const ativo = selecionado === d.nome
          const Tag = onSelect ? 'button' : 'div'
          return (
            <li key={d.nome}>
              <Tag
                onClick={onSelect ? () => onSelect(ativo ? null : d.nome) : undefined}
                className={`block w-full text-left ${onSelect ? 'rounded-lg transition hover:bg-white/5' : ''} ${ativo ? 'bg-white/5' : ''}`}
              >
                <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate text-slate-200" title={d.nome}>{d.nome}</span>
                  <span className="shrink-0 text-xs text-slate-400">{brl(d.valor)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div style={{ width: `${pct}%` }} className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-violet" />
                </div>
              </Tag>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
