import Link from "next/link";
import type { ReactNode } from "react";

import { focusVisibleRingClass, panelSurfaceElevatedClass } from "@/components/ui/foundation";
import { cn } from "@/lib/utils/cn";
import { statusPillClassName } from "@/components/ui/status-pill";

export type WindowFrameStatus = "read-only" | "interactive" | "external-links";
export type WindowFrameSize = "auto" | "fixed";

export type WindowFrameHelp = {
  section: string;
  path: string;
  items: string[];
  cta?: {
    label: string;
    href: string;
  };
};

type WindowFrameProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  status?: WindowFrameStatus;
  help?: WindowFrameHelp;
  size?: WindowFrameSize;
};

export function WindowFrame({
  title,
  subtitle,
  actions,
  children,
  className,
  bodyClassName,
  status,
  help,
  size = "auto"
}: WindowFrameProps) {
  const hasRightControls = Boolean(status || help || actions);
  const isFixed = size === "fixed";

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-border/90 bg-surface shadow-card",
        isFixed ? "md:flex md:h-full md:min-h-0 md:flex-col" : undefined,
        className
      )}
    >
      <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-background/80 to-surface/90 px-3.5 py-1.5 md:px-4 md:py-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-sm border border-black/20 bg-[#ef4444]" />
            <span className="h-2 w-2 rounded-sm border border-black/20 bg-[#f59e0b]" />
            <span className="h-2 w-2 rounded-sm border border-black/20 bg-[#22c55e]" />
          </div>
          <p className="min-w-0 truncate text-xs font-medium text-foreground/92 md:text-sm">
            <span>{title}</span>
            {subtitle ? <span className="ml-2 font-mono text-[10px] font-normal text-foreground/55 md:text-[11px]">{subtitle}</span> : null}
          </p>
        </div>
        {hasRightControls ? (
          <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
            {status ? <span className={statusBadgeClass(status)}>{status}</span> : null}
            {help ? (
              <details className="group relative">
                <summary
                  className={cn(
                    "inline-flex h-5 w-5 cursor-pointer list-none items-center justify-center rounded-md border border-border-interactive/70 bg-interactive-subtle p-0 text-foreground/80 transition-colors hover:bg-nav-hover hover:text-foreground",
                    focusVisibleRingClass
                  )}
                  aria-label="Section help"
                >
                  <svg viewBox="0 0 56 56" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M27.9999 51.9063 C41.0546 51.9063 51.9063 41.0781 51.9063 28 C51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C14.8983 4.0937 4.0937 14.9453 4.0937 28 C4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M27.7890 19.6563 C26.0780 19.6563 24.7421 18.2968 24.7421 16.6094 C24.7421 14.8984 26.0780 13.5390 27.7890 13.5390 C29.4999 13.5390 30.8358 14.8984 30.8358 16.6094 C30.8358 18.2968 29.4999 19.6563 27.7890 19.6563 Z M23.8749 40.8906 C22.9374 40.8906 22.1874 40.2109 22.1874 39.25 C22.1874 38.3359 22.9374 37.6094 23.8749 37.6094 L26.8046 37.6094 L26.8046 26.8516 L24.2733 26.8516 C23.3358 26.8516 22.5858 26.1719 22.5858 25.2109 C22.5858 24.2968 23.3358 23.5703 24.2733 23.5703 L28.7030 23.5703 C29.8749 23.5703 30.5312 24.4141 30.5312 25.6797 L30.5312 37.6094 L33.4374 37.6094 C34.3983 37.6094 35.1483 38.3359 35.1483 39.25 C35.1483 40.2109 34.3983 40.8906 33.4374 40.8906 Z" />
                  </svg>
                </summary>
                <div className={cn("absolute right-0 top-8 z-20 w-72 p-3 backdrop-blur", panelSurfaceElevatedClass)}>
                  <p className="text-xs font-mono text-foreground/70">Section</p>
                  <p className="text-sm font-semibold text-foreground">{help.section}</p>
                  <p className="mt-2 text-xs font-mono text-foreground/70">Path</p>
                  <p className="text-xs font-mono text-brand">{help.path}</p>
                  <p className="mt-2 text-xs font-mono text-foreground/70">What you can do here</p>
                  <ul className="mt-1 space-y-1">
                    {help.items.map((item) => (
                      <li key={item} className="text-xs text-foreground/80">
                        • {item}
                      </li>
                    ))}
                  </ul>
                  {help.cta ? (
                    <Link href={help.cta.href} className="mt-3 inline-flex text-xs font-semibold text-brand hover:text-brand/80">
                      {help.cta.label}
                    </Link>
                  ) : null}
                </div>
              </details>
            ) : null}
            {actions}
          </div>
        ) : null}
      </header>
      <div className={cn("min-w-0 p-5 md:p-6", isFixed ? "md:min-h-0 md:flex-1 md:overflow-y-auto" : undefined, bodyClassName)}>{children}</div>
    </section>
  );
}

function statusBadgeClass(status: WindowFrameStatus): string {
  const base = "inline-flex rounded-full border px-1.5 py-0 text-[9px] font-mono uppercase tracking-wide md:text-[10px]";

  if (status === "interactive") {
    return statusPillClassName(base, "success");
  }

  if (status === "external-links") {
    return statusPillClassName(base, "brand");
  }

  return statusPillClassName(base, "neutral-soft");
}
