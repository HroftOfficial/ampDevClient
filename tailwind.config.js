/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", 
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        green:{
          450: '#00AEAE'
        },
        gray:{
          450: '#4B525C',
          550: '#7C7C7C',
          850: '#333333',
          870: '#4B525C'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
