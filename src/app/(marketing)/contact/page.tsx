import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Gaston Gonzalez for backend, architecture, and product engineering consulting.",
  path: "/contact"
});

export default function ContactRoutePage() {
  return <ContactPage />;
}
