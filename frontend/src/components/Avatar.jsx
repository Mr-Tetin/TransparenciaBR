import { useState } from 'react'
import { iniciais } from '../utils/format.js'

export default function Avatar({ foto, nome, className = 'h-16 w-16 text-lg' }) {
  const [erro, setErro] = useState(false)
  if (!foto || erro) {
    return (
      <div className={`${className} grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue/40 to-brand-violet/40 font-display font-bold text-white`}>
        {iniciais(nome)}
      </div>
    )
  }
  return (
    <img
      src={foto} alt={nome} loading="lazy" referrerPolicy="no-referrer" onError={() => setErro(true)}
      className={`${className} shrink-0 rounded-2xl bg-ink-700 object-cover ring-1 ring-white/10`}
    />
  )
}
