/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: "#1E1E1E",
      foreground: "#E6E4EA",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
