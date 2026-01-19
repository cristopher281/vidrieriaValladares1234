/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // Luxury Palette
        'slate-deep': '#0f172a',    // Background Base
        'cyan-ice': '#e0f2fe',      // High Accents
        'silver-brushed': '#cbd5e1',// Borders/Secondary
        'primary': '#0ea5e9',       // Action Color (Sky-500 equivalent)
      },
      backgroundImage: {
        'luxury-gradient': 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)',
        'glass-shine': 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon': '0 0 10px rgba(14, 165, 233, 0.5), 0 0 20px rgba(14, 165, 233, 0.3)',
      }
    },
  },
  plugins: [],
}
