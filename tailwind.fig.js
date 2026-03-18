/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can fine-tune your SJ (System Junction) colors here
        'static-yellow': '#fef08a',
        'heat-red': '#fca5a5',
        'threat-orange': '#fdba74',
        'pressure-purple': '#d8b4fe',
        'gravity-blue': '#93c5fd',
      },
    },
  },
  plugins: [],
}
