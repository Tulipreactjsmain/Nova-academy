import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },

      fontSize: {
        h1: ["clamp(1.875rem, 5vw, 2.5rem)", { lineHeight: "1.2" }],
        h2: ["clamp(1.5rem, 4vw, 2rem)", { lineHeight: "1.2" }],
        h3: ["clamp(1.25rem, 3.5vw, 1.75rem)", { lineHeight: "1.2" }],
        h4: ["clamp(1.125rem, 3vw, 1.5rem)", { lineHeight: "1.2" }],
        h5: ["clamp(1rem, 2.5vw, 1.25rem)", { lineHeight: "1.2" }],
        h6: ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.2" }],
        sm: ["clamp(0.75rem, 1.5vw, 0.875rem)", { lineHeight: "1.25rem" }],
        md: ["clamp(0.875rem, 1.5vw, 1rem)", { lineHeight: "1.5rem" }],
        lg: ["clamp(1rem, 1.5vw, 1.25rem)", { lineHeight: "1.75rem" }],
        "2xl": ["clamp(1.1rem, 2vw, 1.5rem)", { lineHeight: "2rem" }],
        "3xl": ["clamp(1.5rem, 2.5vw, 1.875rem)", { lineHeight: "2.25rem" }],
        "4xl": ["clamp(1.25rem, 2vw, 2.5rem)", { lineHeight: "2.5rem" }],
        "5xl": ["clamp(1.5rem, 2.5vw, 3rem)", { lineHeight: "3rem" }],
        "6xl": ["clamp(2.5rem, 7.5vw, 3.75rem)", { lineHeight: "1" }],
        "7xl": ["clamp(3rem, 8vw, 4.5rem)", { lineHeight: "1" }],
        "8xl": ["clamp(3.75rem, 9vw, 5.25rem)", { lineHeight: "1" }],
        "9xl": ["clamp(4.5rem, 10vw, 6rem)", { lineHeight: "1" }],
        "10xl": ["clamp(5.25rem, 11vw, 6.75rem)", { lineHeight: "1" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        heading: "500",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      padding: {
        "100": "100px",
      },
      colors: {
        white: "#FFFFFF",
        greenTrust: "#00b67a",
        blue: {
          "blue-border": "#49269b",
          base: "#49269b",
          10: "#A68CE3",
          50: "#FFFFBF",
          // 60: "#8D6BDB",
          80: "#3E2083",
          100: "#673ACF",
          200: "#90cdf4",
          300: "#63b3ed",
          400: "#145C9E",
          500: "#3182ce",
          600: "#5631C4",
          700: "#49269b",
          800: "#2C1863",
          900: "#251452",
        },
        dark: {
          50: "#ebf8ff",
          100: "#000A1F",
          200: "#90cdf4",
          300: "#63b3ed",
          400: "#145C9E",
          500: "#3182ce",
          600: "#2b6cb0",
          700: "#002266",
        },
        yellow: {
          base: "#f17e00",
          100: "#f17e00",
        },
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "1.125rem",
        full: "9999px",
        large: "12px",
      },
      screens: {
        "max-370": { max: "370px" },
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        slide: 'slide 20s linear infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
