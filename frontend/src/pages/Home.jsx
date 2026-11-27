import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Users, Building2, Receipt, LineChart, Eye, ArrowRight } from 'lucide-react'
import useParlamentares from '../hooks/useParlamentares.js'

const passos = [
  { icon: Search, t: 'Busque', d: 'Encontre qualquer deputado ou senador por nome, partido ou estado.' },
  { icon: Receipt, t: 'Consulte', d: 'Veja todas as despesas pagas com a cota parlamentar, ano a ano.' },
  { icon: LineChart, t: 'Entenda', d: 'Gráficos por mês, categoria e fornecedor deixam tudo claro.' },
]

function CasaCard({ to, icon: Icon, titulo, texto, qtd }) {
  return (
    <Link to={to} className="card group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-brand-violet/50 hover:shadow-glow">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-violet/10 blur-2xl transition group-hover:bg-brand-violet/25" />
      <Icon className="mb-4 text-brand-lilac" size={28} />
      <h3 className="text-xl font-bold">{titulo}</h3>
      <p className="mt-1 text-sm text-slate-400">{texto}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="chip">{qtd ?? '…'} parlamentares</span>
        <ArrowRight size={18} className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-brand-lilac" />
      </div>
    </Link>
  )
}

export default function Home() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const dep = useParlamentares('deputados')
  const sen = useParlamentares('senadores')

  const buscar = (e) => {
    e.preventDefault()
    nav(`/deputados${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
  }

  return (
    <div className="animate-fadeUp space-y-16">
      <section className="pt-8 text-center sm:pt-14">
        <span className="chip mb-5 border-brand-violet/30 bg-brand-violet/10 text-brand-lilac"><Eye size={12} />Dinheiro público, informação pública</span>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
          Saiba como seus <span className="gradient-text">parlamentares</span> gastam
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-slate-400">
          Centralizamos em um só lugar os dados de deputados e senadores para que qualquer cidadão possa fiscalizar.
        </p>
        <form onSubmit={buscar} className="mx-auto mt-8 flex max-w-xl gap-2">
          <div className="relative flex-1">
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input className="input !py-3.5 pl-10" placeholder="Buscar deputado pelo nome…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button className="btn-primary px-6">Buscar</button>
        </form>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <CasaCard to="/deputados" icon={Users} titulo="Câmara dos Deputados" texto="Consulte despesas da cota parlamentar com link para cada nota." qtd={dep.dados?.length} />
        <CasaCard to="/senadores" icon={Building2} titulo="Senado Federal" texto="Veja reembolsos do CEAPS por senador, mês e fornecedor." qtd={sen.dados?.length} />
      </section>

      <section>
        <h2 className="mb-6 text-center text-2xl font-bold">Como funciona</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {passos.map(({ icon: Icon, t, d }, i) => (
            <div key={t} className="card p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-violet text-white"><Icon size={17} /></span>
                <span className="font-display text-sm text-slate-500">0{i + 1}</span>
              </div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-slate-400">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
