/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        'black-hans': ['Black Han Sans', 'sans-serif'],
      },
      keyframes: {
        rocketLaunch: {
          '0%': {
            transform: 'translateY(80vh) scale(0.8)',
            opacity: '0.8'
          },
          '20%': {
            transform: 'translateY(50vh) scale(1)',
            opacity: '1'
          },
          '30%': {
            transform: 'translateY(50vh) scale(1)' // Pause for 10% of animation
          },
          '50%': {
            transform: 'translateY(30vh) scale(1.1)' // Slow movement after pause
          },
          '70%': {
            transform: 'translateY(0) scale(1.2)' // Faster movement
          },
          '100%': {
            transform: 'translateY(-20vh) scale(1.3)' // Final overshoot
          }
        }
      },
      animation: {
        'rocket-launch': 'rocketLaunch 2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
      }
    },
  },
  plugins: [],
};