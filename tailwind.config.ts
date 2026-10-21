import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bengals: {
          orange: "#FB4F14",
          "orange-bright": "#FF6B35",
          "orange-dim": "#C43E0F",
          black: "#000000",
          "near-black": "#0A0A0A",
          charcoal: "#1A1A1A",
          "charcoal-light": "#2A2A2A",
          "charcoal-mid": "#1F1F1F",
          white: "#FFFFFF",
          "off-white": "#F5F5F5",
          gray: "#8A8A8A",
          "gray-light": "#B0B0B0",
          "metallic": "#A0A0A0",
          red: "#DC2626",
          "stadium": "#0D0D0D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        score: ["var(--font-score)", "monospace"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "orange-glow": "0 0 20px rgba(251, 79, 20, 0.4)",
        "orange-glow-lg": "0 0 40px rgba(251, 79, 20, 0.5)",
        "stadium": "0 4px 30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "tiger-stripe": "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251,79,20,0.03) 10px, rgba(251,79,20,0.03) 20px)",
        "stadium-gradient": "radial-gradient(ellipse at center top, #1a1a1a 0%, #0a0a0a 60%, #000 100%)",
      },
      animation: {
        "pulse-orange": "pulse-orange 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "stripe-sweep": "stripe-sweep 1.5s ease-out",
        "countdown-tick": "countdown-tick 1s ease-in-out",
      },
      keyframes: {
        "pulse-orange": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(251, 79, 20, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(251, 79, 20, 0)" },
        },
        "stripe-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "countdown-tick": {
          "0%": { transform: "scale(1.05)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
