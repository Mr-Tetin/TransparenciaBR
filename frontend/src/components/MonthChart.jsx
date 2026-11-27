import { MESES, brl, brlCompacto } from '../utils/format.js'

// Gráfico de barras mensal (CSS puro). Clique em uma barra para filtrar a tabela por mês.
export default function MonthChart({ valores, selecionado, onSelect }) {
  const max = Math.max(...valores, 1)
  return (
    <div className="card p-5">
      <h3 className="mb-1 text-base font-semibold">Gastos por mês</h3>
      <p className="mb-5 text-xs text-slate-500">Clique em uma barra para filtrar as despesas do mês.</p>
      <div className="flex h-48 items-end gap-1.5 sm:gap-2.5">
        {valores.map((v, i) => {
          const ativo = selecionado === i + 1
          return (
            <button
              key={i}
              onClick={() => onSelect(ativo ? null : i + 1)}
              title={`${MESES[i]}: ${brl(v)}`}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5"
            >
              <span className="text-[10px] text-slate-500 opacity-0 transition group-hover:opacity-100">
                {v > 0 ? brlCompacto(v) : ''}
              </span>
              <div
                style={{ height: `${Math.max((v / max) * 100, v > 0 ? 3 : 0)}%` }}
                className={`w-full rounded-t-md bg-gradient-to-t from-brand-blue to-brand-violet transition-all
                  ${ativo ? 'opacity-100 ring-2 ring-white/60' : selecionado ? 'opacity-30' : 'opacity-90 group-hover:opacity-100'}`}
              />
              <span className={`text-[10px] sm:text-xs ${ativo ? 'font-semibold text-white' : 'text-slate-500'}`}>{MESES[i]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
