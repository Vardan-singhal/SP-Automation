// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ← this is important
  ],
  theme: {
    extend: {
    keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-12px)' },
  },
  'float-slow': {
    '0%, 100%': { transform: 'translateY(6px)' },
    '50%': { transform: 'translateY(-6px)' },
  },
  shine: {
    '0%': { left: '-75%' },
    '100%': { left: '125%' },
  },
},
animation: {
  float: 'float 5s ease-in-out infinite',
  'float-slow': 'float-slow 7s ease-in-out infinite',
  shine: 'shine 2.5s linear infinite',
},
    },
  },
  plugins: [],
}
