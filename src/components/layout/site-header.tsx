"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { profileContent } from "@/content/profile";
import { cn } from "@/lib/utils/cn";

import { PageContainer } from "./page-container";

type HeaderView = "about" | "projects" | "contact" | "build";

type ShortcutItem = {
  view: HeaderView;
  label: string;
  href: string;
};

const shortcuts: ShortcutItem[] = [
  { view: "about", label: "Profile.md", href: "/about" },
  { view: "projects", label: "Projects/", href: "/projects" },
  { view: "contact", label: "Contact.form", href: "/contact" },
  { view: "build", label: "BuildYours.exe", href: "/product" }
];

export function SiteHeader() {
  const pathname = usePathname();

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const timeLabel = useMemo(
    () =>
      now
        ? new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          }).format(now)
        : "--:--",
    [now]
  );

  const dateLabel = useMemo(
    () =>
      now
        ? new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          }).format(now)
        : "--- -- ----",
    [now]
  );

  const activeView = getActiveView(pathname);

  return (
    <header className="sticky top-0 z-50 shrink-0 bg-background/45 backdrop-blur-md">
      <div className="w-full pt-2 md:pt-3">
        <div className="mx-auto w-[92vw] rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,24,36,0.8),rgba(12,14,22,0.72))] shadow-card md:w-[80vw]">
          <div className="grid items-center gap-1.5 px-4 py-1.5 md:grid-cols-[1fr_auto_1fr] md:gap-2 md:px-6 md:py-2">
            <Link href="/" title="Gastón Germán Gonzalez | Software Engineer" className="group flex min-w-0 items-center gap-3 md:gap-3.5">
              <BrandIcon />
              <span className="min-w-0 truncate">
                <span className="font-sans text-[11px] font-semibold tracking-[0.01em] text-foreground transition-colors group-hover:text-foreground/95 md:text-[13px]">
                  Gastón Germán Gonzalez
                </span>
                <span className="mx-1.5 text-foreground/35">|</span>
                <span className="font-mono text-[10px] tracking-[0.06em] text-brand/90 transition-colors group-hover:text-brand md:text-[11px]">
                  Software Engineer
                </span>
              </span>
            </Link>

            <p className="justify-self-center whitespace-nowrap font-mono text-[11px] text-foreground/80 md:text-xs">
              {timeLabel}
              <span className="mx-2 text-foreground/45">•</span>
              {dateLabel}
            </p>

            <div className="justify-self-end">
              <p className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-foreground/72 md:text-xs">
                <span>{profileContent.location}</span>
                <OnlineStatusIcon />
              </p>
            </div>
          </div>
        </div>
      </div>

      <PageContainer className="py-2 md:py-2.5">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2 md:gap-2.5">
          <nav aria-label="Desktop shortcuts" className="w-full">
            <ul className="mx-auto grid max-w-[740px] grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-4 md:gap-5">
              {shortcuts.map((shortcut) => (
                <li key={shortcut.view} className="flex justify-center">
                  <Link href={shortcut.href} className="group flex w-28 flex-col items-center gap-1 text-center sm:w-[118px]">
                    <span className="grid h-10 w-10 place-items-center transition-transform duration-150 group-hover:-translate-y-0.5 md:h-11 md:w-11">
                      <ShortcutIcon view={shortcut.view} active={activeView === shortcut.view} />
                    </span>
                    <span
                      className={cn(
                        "text-sm transition-colors",
                        activeView === shortcut.view ? "text-brand" : "text-foreground/88 group-hover:text-foreground"
                      )}
                    >
                      {shortcut.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}

function getActiveView(pathname: string): HeaderView | null {
  if (pathname.startsWith("/about")) {
    return "about";
  }

  if (pathname.startsWith("/projects")) {
    return "projects";
  }

  if (pathname.startsWith("/contact")) {
    return "contact";
  }

  if (pathname.startsWith("/create") || pathname.startsWith("/product") || pathname.startsWith("/result/")) {
    return "build";
  }

  return null;
}

function BrandIcon() {
  return (
    <svg
      viewBox="0 0 280 280"
      role="img"
      aria-label="G subscript 3 icon"
      className="h-6 w-6 shrink-0 md:h-7 md:w-7"
    >
      <path
        fill="#88C0D0"
        d="
          M42 52
          H152
          V70
          H60
          V210
          H130
          V174
          H98
          V156
          H152
          V228
          H42
          Z
        "
      />
      <path
        fill="#EBCB8B"
        d="
          M162 72
          H210
          C220 72 228 75 234 80
          C240 85 243 92 243 101
          C243 110 239 117 231 121
          C239 125 245 132 245 143
          C245 154 242 162 235 168
          C229 174 220 177 209 177
          H162
          V162
          H207
          C213 162 217 161 220 158
          C223 156 225 152 225 147
          C225 143 223 139 219 137
          C216 135 211 134 204 134
          H177
          V120
          H203
          C209 120 214 119 217 116
          C220 114 222 110 222 106
          C222 102 220 98 217 96
          C214 94 209 92 203 92
          H162
          V72
          Z
        "
      />
    </svg>
  );
}

function OnlineStatusIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 text-[#32cd32]" aria-hidden>
      <path
        d="M16,3C10.5,3,6,7.5,6,13c0,8.4,9,15.5,9.4,15.8c0.2,0.1,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2C17,28.5,26,21.4,26,13 C26,7.5,21.5,3,16,3z M16,17c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S18.2,17,16,17z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShortcutIcon({ view, active }: { view: HeaderView; active: boolean }) {
  const iconClass = cn("h-8 w-8 transition-colors md:h-9 md:w-9", active ? "text-brand" : "text-[#d7dae4]");

  if (view === "projects") {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M3.5 7.5h6l1.7-2h9.3a1 1 0 0 1 1 1v10.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V7.5Z" />
        <path d="M3.5 9.5h18" />
      </svg>
    );
  }

  if (view === "contact") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} h-6 w-6 md:h-[26px] md:w-[26px]`} fill="currentColor" aria-hidden>
        <path d="M4,24v-5H0V0h23v19h-9.3L4,24z M2,17h4v3.7l7.3-3.7H21V2H2V17z" />
        <rect x="5" y="8" width="3" height="3" />
        <rect x="10" y="8" width="3" height="3" />
        <rect x="15" y="8" width="3" height="3" />
      </svg>
    );
  }

  if (view === "build") {
    return (
      <svg viewBox="0 0 512 512" className={iconClass} aria-hidden>
        <g fill="currentColor">
          <path d="M127.083,247.824l50.031-76.906c0,0-74.734-29.688-109.547-3.078C32.755,194.465,0.005,268.184,0.005,268.184 l37.109,21.516C37.114,289.699,84.083,198.684,127.083,247.824z" />
          <path d="M264.177,384.918l76.906-50.031c0,0,29.688,74.734,3.078,109.547 c-26.625,34.797-100.344,67.563-100.344,67.563l-21.5-37.109C222.317,474.887,313.333,427.918,264.177,384.918z" />
          <path d="M206.692,362.887l-13.203-13.188c-24,62.375-80.375,49.188-80.375,49.188s-13.188-56.375,49.188-80.375 l-13.188-13.188c-34.797-6-79.188,35.984-86.391,76.766c-7.188,40.781-8.391,75.563-8.391,75.563s34.781-1.188,75.578-8.391 S212.692,397.684,206.692,362.887z" />
          <path d="M505.224,6.777C450.786-18.738,312.927,28.98,236.255,130.668c-58.422,77.453-89.688,129.641-89.688,129.641 l46.406,46.406l12.313,12.313l46.391,46.391c0,0,52.219-31.25,129.672-89.656C483.005,199.074,530.739,61.215,505.224,6.777z M274.63,237.371c-12.813-12.813-12.813-33.594,0-46.406s33.578-12.813,46.406,0.016c12.813,12.813,12.813,33.578,0,46.391 C308.208,250.184,287.442,250.184,274.63,237.371z M351.552,160.465c-16.563-16.578-16.563-43.422,0-59.984 c16.547-16.563,43.406-16.563,59.969,0s16.563,43.406,0,59.984C394.958,177.012,368.099,177.012,351.552,160.465z" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M7 4.5h8l4 4v11a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" />
      <path d="M15 4.5v4h4" />
      <path d="M8.5 12h7" />
      <path d="M8.5 15.5h7" />
    </svg>
  );
}
