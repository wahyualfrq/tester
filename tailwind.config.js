/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9", // Sky 500
        secondary: "#6366f1", // Indigo 500
        dark: "#000000", // Black
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        display: ["Syne", "sans-serif"],
        pixel: ['"Press Start 2P"', "cursive"],
        script: ["'Great Vibes'", "cursive"],
        serif: ["'Playfair Display'", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        'star-movement-bottom': 'star-movement-bottom 4s linear infinite',
        'star-movement-top': 'star-movement-top 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '1' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
