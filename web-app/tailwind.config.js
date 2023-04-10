/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/**/*.{js,ts,jsx,tsx}",
    "./src/pages/Brands/Modals/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {},
  },
  plugins: [],
};
