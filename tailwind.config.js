/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dots-pattern":
          "radial-gradient(circle, rgba(0, 152, 255, 0.6) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dots-spacing": "30px 30px", // Adjust for smaller dot spacing
      },
      animation: {
        twinkle: "twinkle 2s infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: 0.8 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
