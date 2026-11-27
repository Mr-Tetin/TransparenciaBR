import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ pagina, total, onChange }) {
  if (total <= 1) return null
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button className="btn-ghost" disabled={pagina <= 1} onClick={() => onChange(pagina - 1)}>
        <ChevronLeft size={16} />Anterior
      </button>
      <span className="text-sm text-slate-400">Página <b className="text-white">{pagina}</b> de {total}</span>
      <button className="btn-ghost" disabled={pagina >= total} onClick={() => onChange(pagina + 1)}>
        Próxima<ChevronRight size={16} />
      </button>
    </div>
  )
}
