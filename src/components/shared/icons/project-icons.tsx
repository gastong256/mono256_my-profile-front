import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type IconProps = {
  className?: string;
};

export function FolderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M3.5 7.5h6l1.7-2h9.3a1 1 0 0 1 1 1v10.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V7.5Z" />
      <path d="M3.5 9.5h18" />
    </svg>
  );
}

export function TechIcon({ tech }: { tech: string }) {
  return techIconByName[tech] ?? <span className="font-mono text-[9px] uppercase text-foreground/70">{toFallbackCode(tech)}</span>;
}

function toFallbackCode(tech: string): string {
  const parts = tech
    .replace(/\./g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

const techIconByName: Record<string, ReactNode> = {
  FastAPI: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#009688" />
      <path d="M8 15.7V8.3h5.8v1.7H9.9v1.3h3.4V13H9.9v2.7zM14.8 8.3h1.8v7.4h-1.8z" fill="#fff" />
    </svg>
  ),
  Django: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#092E20" />
      <path d="M8 8.2h1.8v7.6H8zM10.8 8.2h1.8v7.6h-1.8zM13.8 8.2h1.8v5.3c0 2-.9 2.9-2.9 2.9h-.6v-1.5h.5c.8 0 1.2-.3 1.2-1.3z" fill="#fff" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M12 2.8c-3.6 0-6.5 2.1-6.5 5.4v6.3c0 2.4 1.7 4.1 4.4 4.1l.1 2.6 2-1.7 2 1.7.1-2.6c2.7 0 4.4-1.7 4.4-4.1V8.2c0-3.3-2.9-5.4-6.5-5.4z" fill="#336791" />
      <path d="M9.2 10.2c0-.7.6-1.2 1.4-1.2h2.8c.8 0 1.4.5 1.4 1.2v1.9c0 .7-.6 1.2-1.4 1.2h-2.8c-.8 0-1.4-.5-1.4-1.2z" fill="#fff" />
      <circle cx="10.5" cy="8.4" r=".8" fill="#fff" />
      <circle cx="13.5" cy="8.4" r=".8" fill="#fff" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <circle cx="12" cy="12" r="1.9" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="7.5" ry="2.9" fill="none" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="7.5" ry="2.9" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="7.5" ry="2.9" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#3178C6" />
      <path d="M8.2 9.2h7.6v1.9h-2.8V17h-2v-5.9H8.2zm8.1 2.6c.2-1.1 1.1-1.8 2.5-1.8 1.2 0 2.2.5 2.7 1.5l-1.6.9c-.3-.5-.6-.7-1-.7-.4 0-.7.2-.7.5 0 .4.3.6 1.2.9 1.4.5 2.2 1.1 2.2 2.4 0 1.5-1.2 2.5-2.9 2.5-1.7 0-2.8-.8-3.3-2.1l1.6-.8c.3.6.7 1.1 1.6 1.1.6 0 .9-.2.9-.6 0-.4-.3-.6-1.3-.9-1.4-.5-2.2-1.1-2.2-2.4" fill="#fff" />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <polygon points="12,2.5 20,7 20,17 12,21.5 4,17 4,7" fill="#3C873A" />
      <path d="M9 15V9h1.2l2.6 3.5V9H14v6h-1.1l-2.7-3.6V15z" fill="#fff" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#111" />
      <path d="M9 8.2v7.6h1.7v-4.2l3.3 4.2H16V8.2h-1.7v4.1l-3.2-4.1z" fill="#fff" />
    </svg>
  ),
  TailwindCSS: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        d="M12 7c-2.6 0-4.2 1.3-4.7 3.9.7-.9 1.4-1.2 2.3-1.1.5.1.9.4 1.3.7.7.6 1.5 1.2 3.3 1.2 2.6 0 4.2-1.3 4.7-3.9-.7.9-1.4 1.2-2.3 1.1-.5-.1-.9-.4-1.3-.7-.7-.6-1.5-1.2-3.3-1.2m-4.7 5.3C4.7 12.3 3 13.6 2.6 16.2c.7-.9 1.4-1.2 2.3-1.1.5.1.9.4 1.3.7.7.6 1.5 1.2 3.3 1.2 2.6 0 4.2-1.3 4.7-3.9-.7.9-1.4 1.2-2.3 1.1-.5-.1-.9-.4-1.3-.7-.7-.6-1.5-1.2-3.3-1.2"
        fill="#38BDF8"
      />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <rect x="3" y="9" width="3" height="3" fill="#2496ED" />
      <rect x="7" y="9" width="3" height="3" fill="#2496ED" />
      <rect x="11" y="9" width="3" height="3" fill="#2496ED" />
      <rect x="7" y="5" width="3" height="3" fill="#2496ED" />
      <rect x="11" y="5" width="3" height="3" fill="#2496ED" />
      <path d="M3 13h13.5c.3 2.6-1.6 4.7-4.6 4.7H7.4C5 17.7 3.2 16.2 3 13z" fill="#2496ED" />
      <path d="M17.2 11.6c.5-.2 1.2-.2 1.8 0 .2-.8-.1-1.5-.7-2 .9-.1 1.8.3 2.3 1-.5.2-.9.8-.9 1.4 0 .8-.6 1.5-1.5 1.6-.4.1-.8.1-1.2 0 .1-.7 0-1.3-.3-2z" fill="#2496ED" />
    </svg>
  ),
  OpenTelemetry: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#6A4CFF" />
      <path d="M7 12h3l1.5-3.2 2.3 6.4 1.2-3.2H17" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M12 5 19 18H5z" fill="#fff" />
    </svg>
  ),
  APIs: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7 8h10v8H7z" />
      <path d="M10 8V6m4 2V6m-4 10v2m4-2v2m3-7h2m-2 4h2M5 11H3m2 4H3" />
    </svg>
  ),
  "Data Pipelines": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="5" cy="7" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="19" cy="17" r="1.7" />
      <path d="M6.5 8.2 10.6 10.8m2.8 2.4 4 2.5" />
    </svg>
  ),
  Observability: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5z" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  ),
  "Schema Design": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="4" width="7" height="5" rx="1" />
      <rect x="13.5" y="4" width="7" height="5" rx="1" />
      <rect x="8.5" y="15" width="7" height="5" rx="1" />
      <path d="M10.5 6.5h3m-1.5 2.5v4.2" />
    </svg>
  )
};
