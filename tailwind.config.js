/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cinza-claro": "#d8d8d8",
        "laranja-opaco": "#f35815",
      },
      spacing: {
        25: "25rem",
      },
    },
    borderRadius: {
      "radius-customizado": "0.4rem",
    },
  },
  plugins: [],
};
