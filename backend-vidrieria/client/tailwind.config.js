/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-light': '#FDE68A',
        'gold-medium': '#FBBF24',
        'gold-dark': '#B45309',
      },
    },
  },
  plugins: [],
}
