import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "Professional profile, engineering focus, and delivery highlights.",
  path: "/about"
});

export default function AboutRoutePage() {
  return <AboutPage />;
}
