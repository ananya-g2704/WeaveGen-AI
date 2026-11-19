/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          maroon: "#7B1113",
          deepMaroon: "#4A0E17",
          gold: "#D4AF37",
          lightGold: "#F3E5AB",
          teal: "#0D4D4D",
          deepTeal: "#062C2C",
          cream: "#FDFBF7",
          sand: "#EFE8DA",
          mutedGreen: "#3D604E",
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
