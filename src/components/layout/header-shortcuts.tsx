"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItemActiveClass, navItemClass } from "@/components/ui/foundation";
import { cn } from "@/lib/utils/cn";

import { getActiveView, shortcuts, ShortcutIcon } from "./header-shortcuts-core";

export function HeaderShortcuts() {
  const pathname = usePathname();
  const activeView = getActiveView(pathname);

  return (
    <nav aria-label="Desktop shortcuts" className="hidden w-full md:block">
      <ul className="mx-auto flex max-w-none flex-wrap justify-center gap-4 md:gap-5">
        {shortcuts.map((shortcut) => (
          <li key={shortcut.view} className="flex justify-center">
            <Link
              href={shortcut.href}
              className={cn(
                "group flex w-[118px] flex-col items-center gap-1 text-center",
                navItemClass,
                activeView === shortcut.view ? navItemActiveClass : undefined
              )}
            >
              <span className="grid h-10 w-10 place-items-center transition-transform duration-150 group-hover:-translate-y-0.5 md:h-11 md:w-11">
                <ShortcutIcon view={shortcut.view} active={activeView === shortcut.view} />
              </span>
              <span
                className={cn(
                  "text-sm transition-colors",
                  activeView === shortcut.view
                    ? "text-brand"
                    : shortcut.view === "build"
                      ? "text-[#a89f8b] group-hover:text-[#cec2a7]"
                      : "text-foreground/66 group-hover:text-foreground/88"
                )}
              >
                {shortcut.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
