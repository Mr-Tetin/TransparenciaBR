import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Lista from './pages/Lista.jsx'
import Detalhe from './pages/Detalhe.jsx'

function ScrollTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default function App() {
  return (
    <Layout>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deputados" element={<Lista casa="deputados" />} />
        <Route path="/senadores" element={<Lista casa="senadores" />} />
        <Route path="/deputados/:id" element={<Detalhe casa="deputados" />} />
        <Route path="/senadores/:id" element={<Detalhe casa="senadores" />} />
        <Route
          path="*"
          element={
            <div className="py-24 text-center">
              <h1 className="text-3xl font-bold">Página não encontrada</h1>
              <Link to="/" className="btn-primary mt-6">Voltar ao início</Link>
            </div>
          }
        />
      </Routes>
    </Layout>
  )
}
