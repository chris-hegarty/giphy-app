/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      "peach": "#ff6666",
      "violet": "#9933ff",
      "lime": "#00ff99",
      "yellow": "#fff53c",
      "aqua-blue": "#00ccff",
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}