import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Senior Software Engineer profile: backend systems, architecture mindset, DevOps culture, and pragmatic execution.",
  path: "/about",
});

export default function AboutRoutePage() {
  return <AboutPage />;
}
