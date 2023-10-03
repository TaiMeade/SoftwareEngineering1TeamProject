import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";
// import animate from "tailwindcss-animate";
// require("@tailwindcss/typography"),

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        // padding: "2rem",
      },
      fontFamily: {
        sans: ["var(--font-noto)", ...fontFamily.sans],
        body: ["var(--font-noto)", ...fontFamily.sans],
        heading: ["var(--font-poppins)", ...fontFamily.sans],
      },
      colors: {
        "qhi-accent": "#162E64",
        "qhi-bg": "#f7f7f7",
        "qhi-secondary": "rgb(39, 39, 42)",
        "qhi-bg-alt": "#1e293b",
        "qhi-text": "#121212",
        "qhi-nav": "rgb(245, 245, 245)",
      },
    },
  },
  plugins: [forms({ strategy: "class" }), scrollbar],
} satisfies Config;
