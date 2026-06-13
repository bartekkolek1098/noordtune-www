import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem"
      }
    },
    extend: {
      colors: {
        background: "#050505",
        graphite: "#0b0d0f",
        panel: "#101214",
        line: "rgba(255,255,255,.12)",
        muted: "#a9adb4",
        primary: {
          DEFAULT: "#e30613",
          dark: "#9f0710",
          soft: "rgba(227,6,19,.14)"
        }
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
        display: [
          "Roboto Condensed",
          "Barlow Condensed",
          "Arial Narrow",
          "Noto Sans",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        glow: "0 0 42px rgba(227,6,19,.22)",
        panel: "0 18px 70px rgba(0,0,0,.55)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
