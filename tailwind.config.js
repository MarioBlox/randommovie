/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Just-in-time mode enabled
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css", // Ensure your CSS files are included for purging
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Add Montserrat font here
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
