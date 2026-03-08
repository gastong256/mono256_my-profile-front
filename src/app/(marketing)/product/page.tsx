import type { Metadata } from "next";

import { ProductPage } from "@/components/pages/product-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Product",
  description: "Roadmap and flow for the two-click developer personal website generator.",
  path: "/product"
});

export default function ProductRoutePage() {
  return <ProductPage />;
}
