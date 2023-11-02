import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";
import typography from "@tailwindcss/typography";
import daisyui, { type Config as DaisyConfig } from "daisyui";

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
        "icook-primary": "#2196f3",
        "icook-secondary": "#ff9800",
        "icook-accent": "#ff5722",
        "icook-neutral": "#27272a",
        "icook-base-100": "#e8ecf2",
        "icook-text": "#333",
        "icook-bg": "#F5F5F5",
      },
    },
  },
  daisyui: {
    logs: false,
    themes: [
      {
        icook: {
          primary: "#2196f3",
          secondary: "#ff9800",
          accent: "#ff5722",
          neutral: "#27272a",
          "base-100": "#e8ecf2",
        },
      },
      "light",
    ],
  } satisfies DaisyConfig,
  plugins: [forms({ strategy: "class" }), scrollbar, typography, daisyui],
} satisfies Config;
