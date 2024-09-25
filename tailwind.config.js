module.exports = {
  content: [
    "./app/**/*.{html,js,jsx}",
    "./components/**/*.{html,js,jsx}",
    "./sections/**/*.{html,js,jsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#f9f5f2",
          100: "#f0e0d7",
          200: "#e0c0ae",
          300: "#cf9f85",
          400: "#b6785e",
          500: "#995038", // Your desired shade of brown
          400: "#7b3d2f",
          700: "#5c3025",
          800: "#3e1f1b",
          900: "#1f0f0d",
        },
        customBlue: "#0097B2",
      },
    },
  },
  images: {
    domains: ['cdn.sanity.io'], // Allow images from Sanity CDN
  },
  plugins: [],
};
