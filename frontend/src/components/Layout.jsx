import { Link, NavLink } from 'react-router-dom'
import { Landmark, Building2, Users } from 'lucide-react'

const nav = 'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition'
const link = ({ isActive }) =>
  `${nav} ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-950/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-violet shadow-glow">
              <Landmark size={18} className="text-white" />
            </span>
            <span className="font-display text-lg font-bold text-white">
              Transparência<span className="gradient-text">BR</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/deputados" className={link}><Users size={16} /><span className="hidden sm:inline">Deputados</span></NavLink>
            <NavLink to="/senadores" className={link}><Building2 size={16} /><span className="hidden sm:inline">Senadores</span></NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        Dados abertos da Câmara dos Deputados e do Senado Federal · Projeto TransparenciaBR
      </footer>
    </div>
  )
}
