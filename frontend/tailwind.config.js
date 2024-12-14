/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#212121",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
};