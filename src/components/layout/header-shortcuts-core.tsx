import { cn } from "@/lib/utils/cn";

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
  { view: "build", label: "BuildYours.exe", href: "/product" }
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

  if (pathname.startsWith("/create") || pathname.startsWith("/product") || pathname.startsWith("/result/")) {
    return "build";
  }

  return null;
}

export function ShortcutIcon({
  view,
  active,
  compact = false
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
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M3.5 7.5h6l1.7-2h9.3a1 1 0 0 1 1 1v10.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V7.5Z" />
        <path d="M3.5 9.5h18" />
      </svg>
    );
  }

  if (view === "contact") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(iconClass, compact ? "h-[17px] w-[17px]" : "h-[21px] w-[21px] sm:h-6 sm:w-6 md:h-[26px] md:w-[26px]")}
        fill="currentColor"
        aria-hidden
      >
        <path d="M4,24v-5H0V0h23v19h-9.3L4,24z M2,17h4v3.7l7.3-3.7H21V2H2V17z" />
        <rect x="5" y="8" width="3" height="3" />
        <rect x="10" y="8" width="3" height="3" />
        <rect x="15" y="8" width="3" height="3" />
      </svg>
    );
  }

  if (view === "build") {
    const buildIconClass = cn(
      "h-7 w-7 transition-colors sm:h-8 sm:w-8 md:h-9 md:w-9",
      active
        ? "text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.24)]"
        : "text-[#d9c092] drop-shadow-[0_0_8px_rgba(235,203,139,0.22)] group-hover:text-[#f2d9a4]"
    );

    return (
      <svg viewBox="0 0 512 512" className={buildIconClass} aria-hidden>
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
