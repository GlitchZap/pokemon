/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4dabf5',
          main: '#1976d2',
          dark: '#1565c0',
        },
        secondary: {
          light: '#ff4081',
          main: '#f50057',
          dark: '#c51162',
        },
      }
    },
  },
  plugins: [],
}