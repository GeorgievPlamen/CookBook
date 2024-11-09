/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#e6580c",
        secondary: "#a3e635",
        background: "#292637",
      },
    },
  },
  plugins: [],
};
