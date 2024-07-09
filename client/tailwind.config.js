/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'fancyGray': '',
        'fancyShadowGray': '#F5FAFF',
        'fancyDarkGray': '#64748B',
        'fancyBlack': '#0F172A',
        'fancyInpGray': '#CBD5E1'
      }
    },
  },
  plugins: [],
}

