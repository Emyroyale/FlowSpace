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
        "vibe-bg": "var(--vibe-bg)",
        "vibe-accent": "var(--vibe-accent)",
        "vibe-glow": "var(--vibe-glow)",
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
      },
      fontFamily: {
        clash: ["var(--font-clash)", "sans-serif"],
        geist: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
