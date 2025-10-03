/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        // primary: "#7F27FF",
        "dark-navy": "#1C1E2A",
        "dark-purple": "#2B2F3E",
        "light-purple": "#3E3D5F",

        "teal": "#25D9C6",
        "dark-teal":"#18b2a2",
        "light-teal": "#36F1E0",
        black: {
          300: "#D1D1D1", // Light grayish black
          400: "#A3A3A3", // Grayish black
          500: "#757575", // Medium gray black
          600: "#4B4B4B", // Darker gray black
          700: "#2E2E2E", // Dark black
          800: "#1A1A1A", // Very dark black
          900: "#0D0D0D", // Almost pure black
          DEFAULT: "#000000", // Pure black
        },
      },

      screens: {
        "300px": "300px",
        "350px": "350px",
        "400px": "400px",
        "450px": "450px",
        "500px": "500px",
        "550px": "550px",
        "600px": "600px",
        "650px": "650px",
        "700px": "700px",
        "750px": "750px",
        "800px": "800px",
        "850px": "850px",
        "900px": "900px",
        "950px": "950px",
        "1000px": "1000px",
        "1050px": "1050px",
        "1100px": "1100px",
        "1150px": "1150px",
        "1200px": "1200px",
        "1250px": "1250px",
        "1300px": "1300px",
        "1350px": "1350px",
        "1400px": "1400px",
        "1450px": "1450px",
        "1500px": "1500px",
        "1550px": "1550px",
        "1600px": "1600px",
        "1650px": "1650px",
        "1700px": "1700px",
        "1750px": "1750px",
        "1800px": "1800px",
        "1850px": "1850px",
        "1900px": "1900px",
        "1950px": "1950px",
        "2000px": "2000px",
      },
    },
  },
  plugins: [],
};