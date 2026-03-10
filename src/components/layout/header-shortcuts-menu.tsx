"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { focusVisibleRingClass, navItemActiveClass, navItemClass, panelSurfaceElevatedClass } from "@/components/ui/foundation";
import { cn } from "@/lib/utils/cn";

import { getActiveView, shortcuts, ShortcutIcon } from "./header-shortcuts-core";

export function HeaderShortcutsMenu() {
  const pathname = usePathname();
  const activeView = getActiveView(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((state) => !state)}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md border border-interactive-border/80 bg-interactive-subtle text-foreground/82 hover:bg-nav-hover/80 hover:text-foreground",
          focusVisibleRingClass
        )}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open ? (
        <div className={cn("absolute right-0 top-10 z-50 w-56 p-1.5", panelSurfaceElevatedClass)}>
          <nav aria-label="Mobile shortcuts">
            <ul className="space-y-1">
              {shortcuts.map((shortcut) => {
                const isActive = activeView === shortcut.view;

                return (
                  <li key={`mobile-${shortcut.view}`}>
                    <Link
                      href={shortcut.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm",
                        navItemClass,
                        isActive ? navItemActiveClass : undefined
                      )}
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center">
                        <ShortcutIcon view={shortcut.view} active={isActive} compact />
                      </span>
                      <span className={cn("truncate", isActive ? "text-brand" : "text-foreground/85")}>{shortcut.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
