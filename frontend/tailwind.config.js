/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: { 950: '#05040b', 900: '#0a0813', 800: '#100c20', 700: '#1a1433', 600: '#251c48' },
        brand: { blue: '#4f8cff', sky: '#7db0ff', violet: '#8b5cf6', lilac: '#b79bff' },
      },
      boxShadow: { glow: '0 0 40px -8px rgba(139,92,246,.45)' },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'none' } },
      },
      animation: { fadeUp: 'fadeUp .4s ease-out both' },
    },
  },
  plugins: [],
}
