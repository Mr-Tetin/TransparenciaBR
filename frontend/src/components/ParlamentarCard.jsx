import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import Avatar from './Avatar.jsx'

export default function ParlamentarCard({ p }) {
  return (
    <Link
      to={`/${p.casa}/${p.id}`}
      className="card group flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:border-brand-violet/50 hover:shadow-glow"
    >
      <Avatar foto={p.foto} nome={p.nome} className="h-16 w-16 text-lg" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold">{p.nome}</h3>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <span className="chip border-brand-blue/30 bg-brand-blue/10 text-brand-sky">{p.partido}</span>
          <span className="chip"><MapPin size={11} />{p.uf}</span>
        </div>
      </div>
      <ArrowUpRight size={18} className="text-slate-600 transition group-hover:text-brand-lilac" />
    </Link>
  )
}
