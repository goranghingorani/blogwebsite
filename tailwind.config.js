/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Ramaraja','sans-serif'],
        'custom1': ['Bebas Neue','sans-serif'],
        'custom2' : ['Cedarville Cursive','sans-serif']
      }
    },
  },
  plugins: [],
}

