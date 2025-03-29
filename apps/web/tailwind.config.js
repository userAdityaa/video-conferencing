/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Default font for all sans-serif text
        'black-hans': ['Black Han Sans', 'sans-serif'], // Class: font-black-hans
      },
    },
  },
  plugins: [],
};