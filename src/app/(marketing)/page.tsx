import type { Metadata } from "next";

import { DesktopSurface } from "@/components/marketing/desktop-surface";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description: "Software Engineer portfolio focused on backend systems, architecture, DevOps culture, and production-ready software.",
  path: "/"
});

export default function HomePage() {
  return <DesktopSurface />;
}
