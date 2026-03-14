import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-bg) / <alpha-value>)",
        foreground: "hsl(var(--color-fg) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
          hover: "hsl(var(--color-primary-hover) / <alpha-value>)",
          active: "hsl(var(--color-primary-active) / <alpha-value>)",
          foreground: "hsl(var(--color-primary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent) / <alpha-value>)",
          subtle: "hsl(var(--color-accent-subtle) / <alpha-value>)",
          hover: "hsl(var(--color-accent-hover) / <alpha-value>)",
        },
        focus: "hsl(var(--color-focus-ring) / <alpha-value>)",
        selected: "hsl(var(--color-selected) / <alpha-value>)",
        text: {
          primary: "hsl(var(--color-text-primary) / <alpha-value>)",
          secondary: "hsl(var(--color-text-secondary) / <alpha-value>)",
        },
        interactive: {
          border: "hsl(var(--color-interactive-border) / <alpha-value>)",
          subtle: "hsl(var(--color-interactive-subtle) / <alpha-value>)",
        },
        nav: {
          hover: "hsl(var(--color-nav-hover-bg) / <alpha-value>)",
          active: "hsl(var(--color-nav-active-bg) / <alpha-value>)",
        },
        cta: {
          DEFAULT: "hsl(var(--color-cta-bg) / <alpha-value>)",
          foreground: "hsl(var(--color-cta-foreground) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "hsl(var(--color-brand) / <alpha-value>)",
          foreground: "hsl(var(--color-brand-foreground) / <alpha-value>)",
          hover: "hsl(var(--color-primary-hover) / <alpha-value>)",
          active: "hsl(var(--color-primary-active) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "hsl(var(--color-surface) / <alpha-value>)",
          elevated: "hsl(var(--color-surface-elevated) / <alpha-value>)",
          selected: "hsl(var(--color-surface-selected) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--color-border) / <alpha-value>)",
          interactive: "hsl(var(--color-interactive-border) / <alpha-value>)",
        },
        muted: "hsl(var(--color-muted) / <alpha-value>)",
        success: {
          DEFAULT: "hsl(var(--color-success) / <alpha-value>)",
          subtle: "hsl(var(--color-success-subtle) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        card: "0 14px 35px rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
