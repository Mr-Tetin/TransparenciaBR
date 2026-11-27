# 🇧🇷 TransparenciaBR

> Dinheiro público, informação pública.

O **TransparenciaBR** facilita e centraliza as buscas feitas por cidadãos comuns sobre seus parlamentares (**deputados federais** e **senadores**). Em um só lugar, você encontra quem são os parlamentares, de qual partido e estado são, e **quanto gastaram da cota parlamentar** em cada ano, com gráficos por mês, categoria e fornecedor.

Os dados vêm direto das APIs de **Dados Abertos** da Câmara dos Deputados e do Senado Federal. O projeto não guarda nada em banco de dados: ele consulta as fontes oficiais, organiza e exibe.

---

## 📑 Sumário

- [Sobre o desenvolvimento (transparência sobre o uso de IA)](#-sobre-o-desenvolvimento-transparência-sobre-o-uso-de-ia)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Como funciona](#-como-funciona)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Como rodar](#-como-rodar)
- [Endpoints da API](#-endpoints-da-api)
- [Glossário: entendendo os termos](#-glossário-entendendo-os-termos)
- [Fontes de dados](#-fontes-de-dados)
- [Limitações conhecidas e próximos passos](#-limitações-conhecidas-e-próximos-passos)

---

## 🤝 Sobre o desenvolvimento (transparência sobre o uso de IA)

Como o projeto fala de transparência, nada mais justo do que ser transparente sobre como ele foi feito:

- **Backend (API em C#/.NET): feito inteiramente por mim.** Toda a lógica, a integração com as APIs da Câmara e do Senado, os modelos e os controllers foram escritos por mim, aprendendo em diversas fontes (documentação oficial da Microsoft, vídeos, artigos, fóruns e a própria documentação das APIs de dados abertos).
- **Frontend (React): desenvolvido com auxílio de Inteligência Artificial.** A interface (componentes, estilos e organização das telas) foi gerada com ajuda de IA, e eu usei o projeto para integrar com o backend que construí.
- **Este é o meu primeiro projeto em C#.** Então é natural encontrar pontos que podem ser melhorados. Feedbacks e sugestões são muito bem-vindos! 💜

---

## ✨ Funcionalidades

- 🔎 **Busca de parlamentares** por nome (ignorando acentos), com filtros por **UF** e **partido**
- 🏛️ Listagem separada de **Câmara dos Deputados** e **Senado Federal**
- 👤 **Página de detalhe** de cada parlamentar: foto, partido, estado, e-mail e (no caso dos senadores) fim do mandato
- 💸 **Despesas por ano**, com:
  - total gasto e total glosado
  - quantidade de documentos (notas/recibos)
  - maior fornecedor
  - gráfico de gastos **por mês**
  - gráfico por **categoria** e por **fornecedor**
  - tabela com ordenação, paginação e link para a nota fiscal (quando disponível)
- 🖱️ Filtros interativos: clique em um mês ou categoria para filtrar a tabela
- 📥 **Exportação em CSV** das despesas filtradas

---

## 🧰 Tecnologias

**Backend**

- C# / **.NET 10** (ASP.NET Core Web API com Controllers)
- `HttpClient` tipado via `AddHttpClient<T>()` (um client por fonte de dados)
- `System.Text.Json` para desserialização
- OpenAPI (`Microsoft.AspNetCore.OpenApi`) em ambiente de desenvolvimento

**Frontend**

- React 18 + React Router
- Vite
- Tailwind CSS
- lucide-react (ícones)

---

## ⚙️ Como funciona

```
┌────────────┐    /api/...     ┌───────────────────┐        ┌──────────────────────────┐
│  Frontend  │ ──────────────► │  API .NET (C#)    │ ─────► │ API Dados Abertos Câmara │
│  React     │ ◄────────────── │  TransparenciaBR  │ ◄───── └──────────────────────────┘
│  (Vite)    │      JSON       │                   │        ┌──────────────────────────┐
└────────────┘                 │                   │ ─────► │ API Dados Abertos Senado │
                               └───────────────────┘ ◄───── └──────────────────────────┘
```

1. O **frontend** chama a **API .NET** (`/api/...`).
2. A **API .NET** funciona como uma camada intermediária: recebe a requisição, consulta a API oficial da Câmara ou do Senado e devolve o JSON.
3. O frontend **normaliza** as respostas (a Câmara e o Senado devolvem formatos bem diferentes) para um formato único e mostra tudo na tela.

### No backend

Cada fonte de dados tem seu **client** dentro da pasta `Integrations/`, registrado no `Program.cs` com um endereço base próprio:

| Client | Fonte | Para quê |
|---|---|---|
| `CamaraClient` | `dadosabertos.camara.leg.br/api/v2/` | Lista de deputados e despesas de cada um |
| `SenadoClient` | `legis.senado.leg.br/dadosabertos/` | Lista de senadores em exercício |
| `SenadoDespesasClient` | `adm.senado.gov.br/adm-dadosabertos/` | Despesas (CEAPS) dos senadores |

Os **controllers** (`DeputadoController` e `SenadoController`) apenas expõem as rotas e chamam os clients.

### Particularidades de cada Casa

- **Câmara:** as despesas vêm **paginadas** (100 itens por página). O frontend busca as páginas em sequência e vai mostrando os dados parciais enquanto carrega.
- **Senado:** a API de despesas devolve **todas as despesas de todos os senadores no ano**. O backend baixa essa lista e **filtra pelo código do senador** antes de responder.

### Sobre o CORS

O backend **não** tem CORS configurado. Por isso, em desenvolvimento, o frontend usa o **proxy do Vite**: o navegador chama `/api/...` no próprio Vite (porta 5173) e ele repassa para a API .NET (porta 5073). Assim não há problema de CORS.

---

## 🗂️ Estrutura do projeto

```
TransparenciaBR/
├── TransparenciaBR.API/                 # Backend (.NET)
│   ├── Controllers/
│   │   ├── DeputadoController.cs        # Rotas /api/deputados
│   │   └── SenadoController.cs          # Rotas /api/senado
│   ├── Integrations/
│   │   ├── Camara/
│   │   │   ├── CamaraClient.cs          # Chamadas à API da Câmara
│   │   │   ├── CamaraDeputadosResponse.cs
│   │   │   └── Models/                  # DespesaDeputado, RespostaDespesas, LinkPaginacao
│   │   └── Senado/
│   │       ├── SenadoClient.cs          # Lista de senadores
│   │       ├── SenadoDespesasClient.cs  # Despesas CEAPS
│   │       ├── SenadoResponse.cs        # Modelos da lista de senadores
│   │       └── Models/                  # SenadoDespesas
│   ├── Program.cs                       # Configuração e registro dos HttpClients
│   └── appsettings*.json
│
├── frontend/                            # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/                       # Home, Lista, Detalhe
│   │   ├── components/                  # Cards, gráficos, tabela, paginação...
│   │   ├── hooks/                       # useParlamentares, useDespesas
│   │   ├── services/api.js              # Acesso à API e normalização dos dados
│   │   └── utils/format.js              # Formatação (R$, datas) e agregações
│   ├── vite.config.js                   # Proxy /api → backend
│   └── .env                             # Configuração do proxy/URL da API
│
├── TransparenciaBR.slnx
└── README.md
```

---

## 🚀 Como rodar

### Pré-requisitos

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 18 ou superior (inclui o `npm`)
- Conexão com a internet (os dados vêm das APIs oficiais)

### 1. Clonar o repositório

```bash
git clone https://github.com/Mr-Tetin/TransparenciaBR.git
cd TransparenciaBR
```

### 2. Rodar o backend

```bash
dotnet run --project TransparenciaBR.API --launch-profile http
```

A API sobe em **http://localhost:5073**.

Para testar rapidamente, abra no navegador:

```
http://localhost:5073/api/deputados/dados
http://localhost:5073/api/senado/dados
```

> Em ambiente de desenvolvimento, o documento OpenAPI fica disponível em `http://localhost:5073/openapi/v1.json`.

### 3. Rodar o frontend

Em **outro terminal**:

```bash
cd frontend
npm install
npm run dev
```

Abra **http://localhost:5173** no navegador. 🎉

> ⚠️ O backend precisa estar rodando **antes** de usar o frontend, senão aparecerá a mensagem *"Não foi possível conectar à API"*.

### Configuração (`frontend/.env`)

| Variável | Para que serve | Padrão |
|---|---|---|
| `VITE_API_PROXY` | Endereço da API .NET usado pelo proxy do Vite em desenvolvimento | `http://localhost:5073` |
| `VITE_API_URL` | URL completa da API para build de produção (exige CORS no backend) | *(vazio, usa `/api`)* |

Se você rodar o backend em outra porta (por exemplo, no perfil `https`), ajuste `VITE_API_PROXY`.

### Build de produção do frontend

```bash
cd frontend
npm run build
npm run preview
```

---

## 🔌 Endpoints da API

Base: `http://localhost:5073`

### Câmara dos Deputados

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/deputados/dados` | Lista de deputados (id, nome, partido, UF, e-mail e foto) |
| `GET` | `/api/deputados/{idDeputado}/despesas?ano=2024&pagina=1` | Despesas de um deputado em um ano (100 por página) |

### Senado Federal

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/senado/dados` | Lista de senadores em exercício |
| `GET` | `/api/senado/{codSenador}/despesas/{ano}` | Despesas (CEAPS) de um senador em um ano |

**Exemplos:**

```bash
curl http://localhost:5073/api/deputados/dados
curl "http://localhost:5073/api/deputados/204554/despesas?ano=2024&pagina=1"
curl http://localhost:5073/api/senado/dados
curl http://localhost:5073/api/senado/5672/despesas/2024
```

> Os IDs/códigos acima são apenas ilustrativos. Use a rota `/dados` para descobrir os identificadores reais.

---

## 📖 Glossário: entendendo os termos

### Cota parlamentar (CEAP e CEAPS)

Todo parlamentar tem direito a uma verba mensal para custear despesas do exercício do mandato, como passagens, combustível, divulgação do mandato, aluguel de escritório, telefonia, entre outras. Ela é chamada de:

- **CEAP**: *Cota para o Exercício da Atividade Parlamentar*, usada na **Câmara dos Deputados**.
- **CEAPS**: *Cota para o Exercício da Atividade Parlamentar dos Senadores*, usada no **Senado Federal**.

O valor do teto mensal varia conforme o estado do parlamentar (por causa do custo de deslocamento até Brasília).

### Valor do documento

O valor **total** que consta na nota fiscal ou recibo apresentado pelo parlamentar. No código, vem do campo `valorDocumento`.

### Valor glosado (glosa)

**Glosa** é a parte do valor de um documento que **não foi aceita** para pagamento pela Casa legislativa. Isso acontece, por exemplo, quando:

- o documento tem irregularidades ou está incompleto;
- a despesa não se enquadra nas regras da cota;
- o valor ultrapassa o limite permitido.

Em outras palavras: o parlamentar apresentou uma nota de R$ 1.000, mas R$ 200 foram recusados. Esses **R$ 200 são o valor glosado**. No código, vem do campo `valorGlosa`.

### Valor líquido

É o valor que **efetivamente foi considerado/pago** pela cota:

```
valor líquido = valor do documento − valor glosado
```

O **"Total gasto"** mostrado no TransparenciaBR para deputados usa o **valor líquido**, e o valor glosado aparece como informação complementar quando existe.

### Valor reembolsado (Senado)

No Senado, a API de despesas informa o **valor reembolsado** ao senador, ou seja, quanto a Casa devolveu a ele. Esse é o valor usado como "gasto" para senadores. Essa API **não informa glosa**, então para senadores o campo de glosa fica zerado.

### Fornecedor

Pessoa ou empresa que **emitiu a nota** e recebeu pelo serviço/produto (companhia aérea, posto de combustível, gráfica, hotel, empresa de consultoria etc.).

### CNPJ/CPF do fornecedor

Documento de identificação do fornecedor: **CNPJ** para empresas e **CPF** para pessoas físicas. Útil para pesquisar quem recebeu o dinheiro.

### Tipo de despesa (categoria)

A classificação da despesa conforme as regras da cota. Exemplos: *Emissão de bilhete aéreo*, *Combustíveis e lubrificantes*, *Divulgação da atividade parlamentar*, *Locação ou fretamento de veículos*, *Manutenção de escritório de apoio*. Na tela, os gráficos agrupam o gasto por categoria.

### Documento / número do documento

A nota fiscal ou recibo que comprova a despesa. Para deputados, quando disponível, há um **link direto** para ver o documento original.

### Legislatura e mandato

- **Mandato:** o período em que o parlamentar foi eleito para exercer o cargo (8 anos para senadores, 4 anos para deputados).
- **Legislatura:** o período de 4 anos de funcionamento do Congresso. Um senador cumpre **duas legislaturas** por mandato (por isso a API do Senado traz *primeira* e *segunda* legislatura). O frontend usa a data final da última legislatura como **"Mandato até"**.

### UF

**Unidade Federativa**, ou seja, o estado (ou Distrito Federal) que o parlamentar representa.

### Sigla do partido

Abreviação do partido político ao qual o parlamentar está filiado (ex.: PT, PL, MDB, PSDB).

---

## 🌐 Fontes de dados

Todos os dados são públicos e fornecidos pelas próprias Casas legislativas:

- Câmara dos Deputados: <https://dadosabertos.camara.leg.br/>
- Senado Federal: <https://legis.senado.leg.br/dadosabertos/>
- Senado Federal (despesas CEAPS): <https://adm.senado.gov.br/adm-dadosabertos/>

O TransparenciaBR **não altera nem interpreta** os dados: ele apenas os reúne e apresenta de forma mais simples. Para conferir qualquer informação, consulte o portal oficial de cada Casa.

---

## 🛠️ Limitações conhecidas e próximos passos

Como este é meu primeiro projeto em C#, há pontos que pretendo evoluir:

- [ ] Adicionar **cache** no backend (a lista de deputados/senadores e o arquivo anual de despesas do Senado quase não mudam)
- [ ] Melhorar a **performance** da rota de despesas do Senado, que hoje baixa o ano inteiro de todos os senadores a cada consulta
- [ ] Configurar **CORS** para permitir hospedar frontend e backend separadamente
- [ ] Mover a paginação/agregação das despesas da Câmara para o backend
- [ ] **Tratamento de erros** mais robusto nos clients (hoje falhas das APIs externas podem resultar em erro 500)
- [ ] Remover logs de depuração (`Console.WriteLine`) e arquivos de template (`WeatherForecast.cs`)
- [ ] **Testes automatizados**
- [ ] Deploy do backend e do frontend

---

## 📄 Licença

Defina aqui a licença do projeto (ex.: MIT).

---

Feito por **Raimundo Porto (Neto)**, estudante de Engenharia de Software na UFC Russas.
[GitHub](https://github.com/Mr-Tetin) · [LinkedIn](https://www.linkedin.com/in/raimundo-porto) · [Portfólio](https://raimundodev.netlify.app/)
