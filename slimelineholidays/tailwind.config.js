/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"]
      },
      colors: {
        "theme-blue-color": "#07255E",
        "theme-green-color": "#85FD80",
        "theme-green-dark-color": "#004610",
        "theme-green-middle-color": "#008B02",
        "theme-red-color": "#CA0000"
      },
      screens: {
        "3xl": "1700px",
        ...defaultTheme.screens
      },
      boxShadow: {
        custom: "0px 0px 60px 0px rgba(0, 0, 0, 0.05)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
