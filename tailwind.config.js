/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './app.jsx',
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        zinc: { 850: '#1f1f22', 950: '#0c0c0e' }
      }
    }
  },
  plugins: [],
}
