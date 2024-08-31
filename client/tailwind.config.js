/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './public/index.html',    
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: true
  },
  prefix: 'tw-',
  theme: {

    colors: {
      white: '#fff',
      offWhite: '#fefbea',
      bgDark: '#0b2b26',
    },
    extend: {},
  },
  plugins: [],
}

