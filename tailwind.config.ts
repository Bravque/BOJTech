import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Brand electric blue — sampled from the BOJ logo (#0060FC)
        brand: {
          50: "#e9f1ff",
          100: "#d4e3ff",
          200: "#a9c6ff",
          300: "#7ba4ff",
          400: "#4a80ff",
          500: "#1f63fc",
          600: "#0060fc",
          700: "#0a4bd4",
          800: "#103ba6",
          900: "#143282",
          950: "#0a1e52",
        },
        // Complementary cyan accent that harmonizes with the brand blue
        accent: {
          50: "#ecfeff",
          100: "#cff8fe",
          200: "#a4effc",
          300: "#66e1f9",
          400: "#22c8ee",
          500: "#06aad4",
          600: "#0891b2",
          700: "#0d6c91",
          800: "#155876",
          900: "#164964",
          950: "#083044",
        },
        // Deep navy — sampled from the BOJ logo (#001848)
        ink: {
          50: "#f4f7fb",
          100: "#e7edf6",
          200: "#c9d6e8",
          300: "#9db3d1",
          400: "#6b88b0",
          500: "#4a6690",
          600: "#374f74",
          700: "#2a3d5c",
          800: "#1a2c4d",
          900: "#08194a",
          950: "#03102e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(13, 21, 38, 0.04), 0 8px 24px rgba(13, 21, 38, 0.06)",
        card: "0 1px 3px rgba(13, 21, 38, 0.05), 0 12px 32px rgba(13, 21, 38, 0.08)",
        lift: "0 20px 48px rgba(29, 49, 175, 0.14)",
        glow: "0 0 0 1px rgba(59, 99, 246, 0.16), 0 24px 64px rgba(34, 71, 235, 0.22)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "grid-slate":
          "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.8s ease both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
