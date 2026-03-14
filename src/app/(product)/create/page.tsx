import type { Metadata } from "next";

import { CreatePageContent } from "@/components/pages/create-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Create",
  description:
    "Connection preview for the coming-soon generator: link providers and prepare installation.",
  path: "/create",
});

export default function CreatePage() {
  return <CreatePageContent />;
}
