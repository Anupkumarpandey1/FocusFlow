/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        focus: '#3B82F6',
        dark: '#121212',
        darker: '#0A0A0A',
        card: '#1E1E1E'
      }
    },
  },
  plugins: [],
}
