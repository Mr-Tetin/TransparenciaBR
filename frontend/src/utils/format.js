export const brl = (v) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

const compacto = new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 })
export const brlCompacto = (v) => `R$ ${compacto.format(v || 0)}`

export const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export const fmtData = (s) => {
  if (!s) return '—'
  const [y, m, d] = String(s).slice(0, 10).split('-')
  return d && m && y ? `${d}/${m}/${y}` : '—'
}

export const semAcento = (s = '') => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export const iniciais = (nome = '') =>
  nome.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

// Agrega despesas: total, glosa, por mês, por categoria e por fornecedor.
export function resumir(itens) {
  const porMes = Array(12).fill(0)
  const tipos = new Map()
  const forn = new Map()
  let total = 0
  let glosa = 0
  for (const d of itens) {
    total += d.valor
    glosa += d.glosa
    if (d.mes >= 1 && d.mes <= 12) porMes[d.mes - 1] += d.valor
    tipos.set(d.tipo, (tipos.get(d.tipo) || 0) + d.valor)
    forn.set(d.fornecedor, (forn.get(d.fornecedor) || 0) + d.valor)
  }
  const ordenar = (m) => [...m].map(([nome, valor]) => ({ nome, valor })).sort((a, b) => b.valor - a.valor)
  return { total, glosa, porMes, tipos: ordenar(tipos), fornecedores: ordenar(forn) }
}

export function baixarCSV(itens, nomeArquivo) {
  const cab = ['Data', 'Mês', 'Tipo', 'Fornecedor', 'CNPJ/CPF', 'Documento', 'Valor (R$)']
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const linhas = itens.map((d) =>
    [fmtData(d.data), d.mes, d.tipo, d.fornecedor, d.cnpj, d.documento, d.valor.toFixed(2).replace('.', ',')].map(esc).join(';'))
  const blob = new Blob(['\ufeff' + [cab.join(';'), ...linhas].join('\n')], { type: 'text/csv;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = nomeArquivo
  a.click()
  URL.revokeObjectURL(a.href)
}
