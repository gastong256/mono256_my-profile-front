import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact mono256 for collaboration, consulting, and product opportunities.",
  path: "/contact"
});

export default function ContactRoutePage() {
  return <ContactPage />;
}
