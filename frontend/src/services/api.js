// Camada de acesso à API (.NET). Não altera o backend: apenas consome as rotas existentes.
//   GET /api/deputados/dados
//   GET /api/deputados/{id}/despesas?ano=&pagina=
//   GET /api/senado/dados
//   GET /api/senado/{cod}/despesas/{ano}
const BASE = import.meta.env.VITE_API_URL ?? '/api'

async function get(path) {
  let res
  try {
    res = await fetch(`${BASE}${path}`)
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique se o backend está em execução.')
  }
  if (!res.ok) throw new Error(`A API respondeu com erro ${res.status}. Tente novamente em instantes.`)
  return res.json()
}

// O backend pode serializar em PascalCase (Senado) ou camelCase: aceitamos ambos.
const pick = (o, k) => o?.[k] ?? o?.[k[0].toLowerCase() + k.slice(1)]
const https = (u) => (u ? u.replace(/^http:\/\//, 'https://') : '')

const normDeputado = (d) => ({
  id: String(d.id),
  casa: 'deputados',
  nome: d.nome,
  partido: d.siglaPartido || '—',
  uf: d.siglaUf || '—',
  email: d.email || '',
  foto: https(d.urlFoto),
})

const normSenador = (s) => {
  const i = pick(s, 'IdentificacaoParlamentar')
  const m = pick(s, 'Mandato')
  const leg = pick(m, 'SegundaLegislaturaDoMandato') ?? pick(m, 'PrimeiraLegislaturaDoMandato')
  return {
    id: String(pick(i, 'CodigoParlamentar')),
    casa: 'senadores',
    nome: pick(i, 'NomeParlamentar'),
    partido: pick(i, 'SiglaPartido') || '—',
    uf: pick(i, 'UfParlamentar') || '—',
    email: pick(i, 'EmailParlamentar') || '',
    foto: https(pick(i, 'UrlFotoParlamentar')),
    mandatoAte: pick(leg, 'DataFim') || '',
  }
}

const cache = {}
export function listarParlamentares(casa) {
  if (!cache[casa]) {
    const req = casa === 'deputados'
      ? get('/deputados/dados').then((l) => l.map(normDeputado))
      : get('/senado/dados').then((l) => l.map(normSenador))
    cache[casa] = req.catch((e) => { delete cache[casa]; throw e })
  }
  return cache[casa]
}

// Câmara: resposta paginada { dados, links }. Retorna itens normalizados + flag de próxima página.
export async function despesasDeputado(id, ano, pagina) {
  const r = await get(`/deputados/${id}/despesas?ano=${ano}&pagina=${pagina}`)
  const dados = r?.dados ?? []
  return {
    temProxima: !!r?.links?.some((l) => l.rel === 'next') && dados.length > 0,
    itens: dados.map((d) => ({
      ano: d.ano, mes: d.mes, data: d.dataDocumento, tipo: d.tipoDespesa || 'Outros',
      fornecedor: d.nomeFornecedor || '—', cnpj: d.cnpjcpfFornecedor || '',
      documento: d.numDocumento || '', url: d.urlDocumento || '',
      valor: d.valorLiquido ?? 0, glosa: d.valorGlosa ?? 0, detalhe: '',
    })),
  }
}

// Senado: lista completa do ano (já filtrada por senador no backend).
export async function despesasSenador(id, ano) {
  const r = await get(`/senado/${id}/despesas/${ano}`)
  return r.map((d) => ({
    ano: d.ano, mes: d.mes, data: d.data, tipo: d.tipoDespesa || 'Outros',
    fornecedor: d.fornecedor || '—', cnpj: d.CnpjCpf || d.cnpjCpf || '',
    documento: d.documento || '', url: '',
    valor: d.valorReembolsado ?? 0, glosa: 0, detalhe: d.detalhamento || '',
  }))
}
