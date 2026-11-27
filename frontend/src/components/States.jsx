import { AlertTriangle, SearchX, RefreshCw } from 'lucide-react'

export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-white/5 ${className}`} />
)

export const SkeletonGrid = ({ n = 12 }) => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: n }).map((_, i) => <Skeleton key={i} className="h-24" />)}
  </div>
)

export function ErrorState({ mensagem, onRetry }) {
  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <AlertTriangle className="mx-auto mb-3 text-brand-lilac" size={32} />
      <h3 className="text-lg font-semibold">Algo deu errado</h3>
      <p className="mt-1 text-sm text-slate-400">{mensagem}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-5"><RefreshCw size={16} />Tentar novamente</button>
      )}
    </div>
  )
}

export const EmptyState = ({ titulo = 'Nada encontrado', texto }) => (
  <div className="py-16 text-center">
    <SearchX className="mx-auto mb-3 text-slate-600" size={36} />
    <h3 className="text-lg font-semibold">{titulo}</h3>
    {texto && <p className="mt-1 text-sm text-slate-500">{texto}</p>}
  </div>
)
