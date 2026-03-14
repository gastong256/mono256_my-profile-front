import { cn } from "@/lib/utils/cn";
import {
  BuildShortcutIcon,
  ContactShortcutIcon,
  ProfileShortcutIcon,
  ProjectsShortcutIcon,
} from "@/components/shared/icons/shortcut-icons";

export type HeaderView = "about" | "projects" | "contact" | "build";

export type ShortcutItem = {
  view: HeaderView;
  label: string;
  href: string;
};

export const shortcuts: ShortcutItem[] = [
  { view: "about", label: "Profile.md", href: "/about" },
  { view: "projects", label: "Projects/", href: "/projects" },
  { view: "contact", label: "Contact.form", href: "/contact" },
  { view: "build", label: "BuildYours.exe", href: "/product" },
];

export function getActiveView(pathname: string): HeaderView | null {
  if (pathname.startsWith("/about")) {
    return "about";
  }

  if (pathname.startsWith("/projects")) {
    return "projects";
  }

  if (pathname.startsWith("/contact")) {
    return "contact";
  }

  if (
    pathname.startsWith("/create") ||
    pathname.startsWith("/product") ||
    pathname.startsWith("/result/")
  ) {
    return "build";
  }

  return null;
}

export function ShortcutIcon({
  view,
  active,
  compact = false,
}: {
  view: HeaderView;
  active: boolean;
  compact?: boolean;
}) {
  const iconClass = cn(
    compact ? "h-5 w-5" : "h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9",
    "transition-colors",
    active ? "text-primary" : "text-[#b8c0cc]"
  );

  if (view === "projects") {
    return <ProjectsShortcutIcon className={iconClass} />;
  }

  if (view === "contact") {
    return (
      <ContactShortcutIcon
        className={cn(
          iconClass,
          compact
            ? "h-[17px] w-[17px]"
            : "h-[21px] w-[21px] sm:h-6 sm:w-6 md:h-[26px] md:w-[26px]"
        )}
      />
    );
  }

  if (view === "build") {
    const buildIconClass = cn(
      "h-7 w-7 transition-colors sm:h-8 sm:w-8 md:h-9 md:w-9",
      active
        ? "text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.24)]"
        : "text-[#d9c092] drop-shadow-[0_0_8px_rgba(235,203,139,0.22)] group-hover:text-[#f2d9a4]"
    );

    return <BuildShortcutIcon className={buildIconClass} />;
  }

  return <ProfileShortcutIcon className={iconClass} />;
}
