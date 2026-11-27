import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, MapPin, Wallet, FileText, Store, Download, Search, X, Loader2, CalendarClock } from 'lucide-react'
import useParlamentares from '../hooks/useParlamentares.js'
import useDespesas from '../hooks/useDespesas.js'
import Avatar from '../components/Avatar.jsx'
import StatCard from '../components/StatCard.jsx'
import MonthChart from '../components/MonthChart.jsx'
import CategoryBars from '../components/CategoryBars.jsx'
import ExpensesTable from '../components/ExpensesTable.jsx'
import { Skeleton, ErrorState } from '../components/States.jsx'
import { MESES, baixarCSV, brl, fmtData, resumir, semAcento } from '../utils/format.js'

const anoAtual = new Date().getFullYear()
const ANOS = Array.from({ length: anoAtual - 2018 }, (_, i) => anoAtual - i)

export default function Detalhe({ casa }) {
  const { id } = useParams()
  const lista = useParlamentares(casa)
  const [ano, setAno] = useState(anoAtual)
  const desp = useDespesas(casa, id, ano)
  const [mes, setMes] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [q, setQ] = useState('')

  const p = lista.dados?.find((x) => x.id === id)
  const resumo = useMemo(() => resumir(desp.itens), [desp.itens])

  const filtradas = useMemo(() => {
    const termo = semAcento(q.trim())
    return desp.itens.filter((d) =>
      (!mes || d.mes === mes) && (!tipo || d.tipo === tipo) &&
      (!termo || semAcento(`${d.fornecedor} ${d.tipo} ${d.cnpj} ${d.documento}`).includes(termo)))
  }, [desp.itens, mes, tipo, q])

  const trocarAno = (a) => { setAno(a); setMes(null); setTipo(null); setQ('') }
  const temFiltro = mes || tipo || q
  const voltar = `/${casa}`

  if (lista.erro) return <ErrorState mensagem={lista.erro} onRetry={lista.recarregar} />
  if (lista.dados && !p) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Parlamentar não encontrado</h1>
        <Link to={voltar} className="btn-primary mt-6">Voltar à lista</Link>
      </div>
    )
  }

  return (
    <div className="animate-fadeUp space-y-6">
      <Link to={voltar} className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white">
        <ArrowLeft size={16} />Voltar para {casa === 'deputados' ? 'deputados' : 'senadores'}
      </Link>

      {/* Cabeçalho do parlamentar */}
      <section className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        {p ? (
          <div className="flex items-center gap-5">
            <Avatar foto={p.foto} nome={p.nome} className="h-24 w-24 text-3xl" />
            <div className="min-w-0">
              <h1 className="text-2xl font-bold sm:text-3xl">{p.nome}</h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="chip border-brand-blue/30 bg-brand-blue/10 text-brand-sky">{p.partido}</span>
                <span className="chip"><MapPin size={11} />{p.uf}</span>
                <span className="chip">{casa === 'deputados' ? 'Deputado(a) Federal' : 'Senador(a)'}</span>
                {p.mandatoAte && <span className="chip"><CalendarClock size={11} />Mandato até {fmtData(p.mandatoAte)}</span>}
              </div>
              {p.email && (
                <a href={`mailto:${p.email}`} className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-sky hover:text-brand-lilac">
                  <Mail size={14} />{p.email}
                </a>
              )}
            </div>
          </div>
        ) : <Skeleton className="h-24 w-full sm:w-96" />}

        <label className="flex flex-col gap-1 text-xs text-slate-500">
          Ano das despesas
          <select className="input w-full sm:w-32" value={ano} onChange={(e) => trocarAno(Number(e.target.value))}>
            {ANOS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
      </section>

      {desp.erro && !desp.itens.length ? (
        <ErrorState mensagem={desp.erro} onRetry={desp.recarregar} />
      ) : (
        <>
          {desp.carregando && (
            <div className="flex items-center gap-2 rounded-xl border border-brand-violet/30 bg-brand-violet/10 px-4 py-3 text-sm text-brand-lilac">
              <Loader2 size={16} className="animate-spin" />
              {casa === 'deputados'
                ? `Carregando despesas de ${ano}… página ${desp.pagina + 1} (${desp.itens.length} registros até agora)`
                : `Carregando despesas de ${ano}… isso pode levar alguns segundos.`}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={Wallet} label={`Total gasto em ${ano}`} value={brl(resumo.total)}
              hint={resumo.glosa > 0 ? `${brl(resumo.glosa)} glosados` : 'Valor líquido'} />
            <StatCard icon={FileText} label="Documentos" value={desp.itens.length.toLocaleString('pt-BR')} hint="Notas e recibos registrados" />
            <StatCard icon={Store} label="Maior fornecedor" value={resumo.fornecedores[0] ? brl(resumo.fornecedores[0].valor) : '—'}
              hint={resumo.fornecedores[0]?.nome ?? 'Sem dados'} />
          </div>

          {desp.itens.length > 0 && (
            <>
              <MonthChart valores={resumo.porMes} selecionado={mes} onSelect={setMes} />
              <div className="grid gap-4 lg:grid-cols-2">
                <CategoryBars titulo="Por categoria" dados={resumo.tipos} total={resumo.total} selecionado={tipo} onSelect={setTipo} />
                <CategoryBars titulo="Maiores fornecedores" dados={resumo.fornecedores} total={resumo.total} />
              </div>
            </>
          )}

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">
                Despesas <span className="text-sm font-normal text-slate-500">({filtradas.length})</span>
              </h2>
              <button className="btn-ghost" disabled={!filtradas.length}
                onClick={() => baixarCSV(filtradas, `despesas-${casa}-${id}-${ano}.csv`)}>
                <Download size={16} />Exportar CSV
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[220px] flex-1">
                <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input className="input pl-10" placeholder="Filtrar por fornecedor, categoria, CNPJ…" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              {mes && <button className="chip border-brand-violet/40 bg-brand-violet/15 text-brand-lilac" onClick={() => setMes(null)}>{MESES[mes - 1]} <X size={12} /></button>}
              {tipo && <button className="chip max-w-[260px] border-brand-blue/40 bg-brand-blue/15 text-brand-sky" onClick={() => setTipo(null)}><span className="truncate">{tipo}</span><X size={12} /></button>}
              {temFiltro && <button className="text-xs text-slate-400 underline hover:text-white" onClick={() => { setMes(null); setTipo(null); setQ('') }}>Limpar filtros</button>}
            </div>

            {desp.carregando && !desp.itens.length ? <Skeleton className="h-64" /> : <ExpensesTable itens={filtradas} />}
          </section>
        </>
      )}
    </div>
  )
}
