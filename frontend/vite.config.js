import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// O backend não possui CORS, então em desenvolvimento usamos um proxy do Vite:
// o front chama /api/... e o Vite repassa para a API .NET.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY || 'http://localhost:5073',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
