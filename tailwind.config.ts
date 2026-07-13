import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terrace: {
          DEFAULT: "#14301F",
          light: "#1F4A30",
        },
        chalk: "#F2F0E6",
        floodlight: "#F2A93B",
        turnstile: "#1B2A3D",
        rust: "#C1432E",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "turf-lines": "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 2px, transparent 2px, transparent 40px)",
      },
    },
  },
  plugins: [],
};

export default config;
