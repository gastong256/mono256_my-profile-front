import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-bg) / <alpha-value>)",
        foreground: "hsl(var(--color-fg) / <alpha-value>)",
        brand: {
          DEFAULT: "hsl(var(--color-brand) / <alpha-value>)",
          foreground: "hsl(var(--color-brand-foreground) / <alpha-value>)"
        },
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        muted: "hsl(var(--color-muted) / <alpha-value>)"
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)"
      },
      boxShadow: {
        card: "0 8px 30px rgba(10, 17, 40, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
