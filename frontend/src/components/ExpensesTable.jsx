import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react'
import { brl, fmtData } from '../utils/format.js'
import Pagination from './Pagination.jsx'
import { EmptyState } from './States.jsx'

const POR_PAGINA = 15

export default function ExpensesTable({ itens }) {
  const [pagina, setPagina] = useState(1)
  const [ordem, setOrdem] = useState({ campo: 'data', dir: -1 })
  useEffect(() => setPagina(1), [itens])

  const ordenados = useMemo(() => {
    const { campo, dir } = ordem
    return [...itens].sort((a, b) => {
      const x = campo === 'valor' ? a.valor : a.data || ''
      const y = campo === 'valor' ? b.valor : b.data || ''
      return (x > y ? 1 : x < y ? -1 : 0) * dir
    })
  }, [itens, ordem])

  const alternar = (campo) =>
    setOrdem((o) => (o.campo === campo ? { campo, dir: -o.dir } : { campo, dir: -1 }))
  const Seta = ({ campo }) =>
    ordem.campo === campo ? (ordem.dir === 1 ? <ArrowUp size={12} /> : <ArrowDown size={12} />) : null

  if (!itens.length) return <EmptyState titulo="Nenhuma despesa encontrada" texto="Ajuste os filtros ou escolha outro ano." />

  const total = Math.ceil(ordenados.length / POR_PAGINA)
  const visiveis = ordenados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  return (
    <div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="cursor-pointer px-4 py-3" onClick={() => alternar('data')}>
                <span className="inline-flex items-center gap-1">Data<Seta campo="data" /></span>
              </th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Fornecedor</th>
              <th className="cursor-pointer px-4 py-3 text-right" onClick={() => alternar('valor')}>
                <span className="inline-flex items-center gap-1">Valor<Seta campo="valor" /></span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {visiveis.map((d, i) => (
              <tr key={i} className="transition hover:bg-white/[.03]">
                <td className="whitespace-nowrap px-4 py-3 text-slate-400">{fmtData(d.data)}</td>
                <td className="max-w-[240px] px-4 py-3 text-slate-200"><span className="line-clamp-2">{d.tipo}</span></td>
                <td className="max-w-[260px] px-4 py-3">
                  <div className="truncate text-slate-200" title={d.fornecedor}>{d.fornecedor}</div>
                  <div className="truncate text-xs text-slate-500">
                    {[d.cnpj, d.documento && `Doc. ${d.documento}`].filter(Boolean).join(' · ')}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-white">
                  {brl(d.valor)}
                  {d.url && (
                    <a href={d.url} target="_blank" rel="noreferrer" title="Ver nota/documento" className="ml-2 inline-block align-middle text-brand-sky hover:text-brand-lilac">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination pagina={pagina} total={total} onChange={setPagina} />
    </div>
  )
}
