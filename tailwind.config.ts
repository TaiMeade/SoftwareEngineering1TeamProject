import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";
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
        "icook-secondary": "#2196f3",
        "icook-accent": "#ce0899",
        "icook-neutral": "#151b23",
        "icook-base-100": "#e8ecf2",
        "icook-text": "#333",
        "icook-bg": "#F5F5F5",
      },
    },
  },
  plugins: [forms({ strategy: "class" }), scrollbar, daisyui],
  daisyui: {
    // themes: ["light", "business"],
    themes: [
      {
        icook: {
          primary: "#2196f3",
          secondary: "#4fff72",
          accent: "#ce0899",
          neutral: "#151b23",
          "base-100": "#e8ecf2",
          info: "#3b97e3",
          success: "#116f40",
          warning: "#9a7c0e",
          error: "#f6657f",
        },
      },
    ],
    logs: false,
  } satisfies DaisyConfig,
} satisfies Config;
