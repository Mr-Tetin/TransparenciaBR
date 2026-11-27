import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import useParlamentares from '../hooks/useParlamentares.js'
import ParlamentarCard from '../components/ParlamentarCard.jsx'
import Pagination from '../components/Pagination.jsx'
import { SkeletonGrid, ErrorState, EmptyState } from '../components/States.jsx'
import { semAcento } from '../utils/format.js'

const POR_PAGINA = 24
const TITULOS = { deputados: 'Deputados Federais', senadores: 'Senadores' }

export default function Lista({ casa }) {
  const [params] = useSearchParams()
  const { dados, erro, carregando, recarregar } = useParlamentares(casa)
  const [q, setQ] = useState(params.get('q') || '')
  const [uf, setUf] = useState('')
  const [partido, setPartido] = useState('')
  const [pagina, setPagina] = useState(1)

  useEffect(() => { setQ(params.get('q') || ''); setUf(''); setPartido(''); setPagina(1) }, [casa, params])
  useEffect(() => setPagina(1), [q, uf, partido])

  const ufs = useMemo(() => [...new Set((dados || []).map((p) => p.uf))].sort(), [dados])
  const partidos = useMemo(() => [...new Set((dados || []).map((p) => p.partido))].sort(), [dados])

  const filtrados = useMemo(() => {
    const termo = semAcento(q.trim())
    return (dados || [])
      .filter((p) => (!termo || semAcento(p.nome).includes(termo)) && (!uf || p.uf === uf) && (!partido || p.partido === partido))
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }, [dados, q, uf, partido])

  const total = Math.ceil(filtrados.length / POR_PAGINA)
  const visiveis = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)
  const temFiltro = q || uf || partido

  return (
    <div className="animate-fadeUp">
      <h1 className="text-3xl font-bold">{TITULOS[casa]}</h1>
      <p className="mt-1 text-sm text-slate-400">
        {dados ? `${filtrados.length} de ${dados.length} parlamentares` : 'Carregando parlamentares…'}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_130px_150px_auto]">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input className="input pl-10" placeholder="Buscar por nome…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="input" value={uf} onChange={(e) => setUf(e.target.value)} aria-label="Estado">
          <option value="">Todos UFs</option>
          {ufs.map((u) => <option key={u}>{u}</option>)}
        </select>
        <select className="input" value={partido} onChange={(e) => setPartido(e.target.value)} aria-label="Partido">
          <option value="">Todos partidos</option>
          {partidos.map((p) => <option key={p}>{p}</option>)}
        </select>
        {temFiltro && (
          <button className="btn-ghost" onClick={() => { setQ(''); setUf(''); setPartido('') }}><X size={16} />Limpar</button>
        )}
      </div>

      <div className="mt-6">
        {carregando && <SkeletonGrid />}
        {erro && <ErrorState mensagem={erro} onRetry={recarregar} />}
        {dados && !filtrados.length && <EmptyState texto="Tente outro nome, estado ou partido." />}
        {dados && filtrados.length > 0 && (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visiveis.map((p) => <ParlamentarCard key={p.id} p={p} />)}
            </div>
            <Pagination pagina={pagina} total={total} onChange={(n) => { setPagina(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
          </>
        )}
      </div>
    </div>
  )
}
