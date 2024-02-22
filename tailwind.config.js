/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#812093',
        secondary: '#353935',
        background: '#28282B',
        accent: '#1B1212'
      }
    }
  },
  plugins: []
}
