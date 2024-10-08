/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tell Tailwind to scan these files for class names
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        card: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
    },
  },
  plugins: [],
};
