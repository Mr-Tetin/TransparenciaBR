import { useEffect, useState } from 'react'
import { listarParlamentares } from '../services/api.js'

export default function useParlamentares(casa) {
  const [state, setState] = useState({ dados: null, erro: null })
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let vivo = true
    setState({ dados: null, erro: null })
    listarParlamentares(casa)
      .then((dados) => vivo && setState({ dados, erro: null }))
      .catch((e) => vivo && setState({ dados: null, erro: e.message }))
    return () => { vivo = false }
  }, [casa, tentativa])

  return { ...state, carregando: !state.dados && !state.erro, recarregar: () => setTentativa((t) => t + 1) }
}
