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
        "moss": "#53664B",
        "moss-light": "#6B8061",
        "moss-dark": "#3D4D38",
        "sage": "#9AA891",
        "sage-light": "#B5C4AE",
        "cream": "#F9F7F1",
        "cream-dark": "#F0EBE0",
        "sand": "#E8DFD0",
        "sand-dark": "#D4C8B5",
        "earth": "#8B6F55",
        "earth-dark": "#6B5242",
        "text-dark": "#30372F",
        "text-medium": "#5A6358",
        "text-light": "#8A9688",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
      },
      spacing: {
        "section": "clamp(5rem, 10vw, 9rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "nature": "0 4px 24px -4px rgba(48, 55, 47, 0.12), 0 2px 8px -2px rgba(48, 55, 47, 0.08)",
        "nature-lg": "0 12px 48px -8px rgba(48, 55, 47, 0.18), 0 4px 16px -4px rgba(48, 55, 47, 0.1)",
        "nature-xl": "0 24px 80px -16px rgba(48, 55, 47, 0.24)",
      },
      backgroundImage: {
        "gradient-nature": "linear-gradient(135deg, #53664B 0%, #3D4D38 100%)",
        "gradient-cream": "linear-gradient(180deg, #F9F7F1 0%, #F0EBE0 100%)",
        "gradient-overlay": "linear-gradient(to right, rgba(48,55,47,0.85) 0%, rgba(48,55,47,0.4) 60%, transparent 100%)",
        "gradient-overlay-mobile": "linear-gradient(to top, rgba(48,55,47,0.9) 0%, rgba(48,55,47,0.5) 50%, transparent 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      transitionTimingFunction: {
        "nature": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
