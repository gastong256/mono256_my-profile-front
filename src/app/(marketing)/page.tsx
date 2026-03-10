import type { Metadata } from "next";

import { DesktopSurface } from "@/components/marketing/desktop-surface";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description: "Senior Software Engineer building reliable systems, scalable APIs, and automation-driven software with a strong focus on DevOps culture and production readiness.",
  path: "/"
});

export default function HomePage() {
  return <DesktopSurface />;
}
