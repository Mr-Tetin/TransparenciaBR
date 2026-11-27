import { useEffect, useState } from 'react'
import { despesasDeputado, despesasSenador } from '../services/api.js'

const MAX_PAGINAS = 40

// Carrega as despesas do ano. Na Câmara a API é paginada (100/pág.): busca todas as páginas
// em sequência, mostrando os dados parciais enquanto carrega.
export default function useDespesas(casa, id, ano) {
  const [s, setS] = useState({ itens: [], carregando: true, pagina: 0, erro: null })
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let vivo = true
    setS({ itens: [], carregando: true, pagina: 0, erro: null })
    ;(async () => {
      try {
        if (casa === 'senadores') {
          const itens = await despesasSenador(id, ano)
          if (vivo) setS({ itens, carregando: false, pagina: 1, erro: null })
          return
        }
        let acc = []
        for (let p = 1; p <= MAX_PAGINAS; p++) {
          const { itens, temProxima } = await despesasDeputado(id, ano, p)
          if (!vivo) return
          acc = acc.concat(itens)
          setS({ itens: acc, carregando: temProxima, pagina: p, erro: null })
          if (!temProxima) break
        }
        if (vivo) setS((x) => ({ ...x, carregando: false }))
      } catch (e) {
        if (vivo) setS((x) => ({ ...x, carregando: false, erro: e.message }))
      }
    })()
    return () => { vivo = false }
  }, [casa, id, ano, tentativa])

  return { ...s, recarregar: () => setTentativa((t) => t + 1) }
}
