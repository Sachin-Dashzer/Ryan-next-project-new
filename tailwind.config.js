/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "red",
        myblue: "#4a778b",
        "dark-gray": "#2f2f2f",
      },

      fontFamily: {
        hind: ["var(--font-hind-siliguri)"],
      },
    },
  },
  plugins: [],
};
