import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: { center: true },
      fontFamily: {
        sans: ["var(--font-noto)", ...fontFamily.sans],
        body: ["var(--font-noto)", ...fontFamily.sans],
        heading: ["var(--font-poppins)", ...fontFamily.sans],
      },
      colors: {
        "icook-nav": "rgb(245, 245, 245)",
        "icook-primary": "#FF5722",
        "icook-secondary": "#2196F3",
        "icook-accent": "#4CAF50",
        "icook-text": "#333",
        "icook-background": "#F5F5F5",
      },
    },
  },
  plugins: [forms({ strategy: "class" }), scrollbar],
} satisfies Config;
