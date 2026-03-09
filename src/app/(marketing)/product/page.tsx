import type { Metadata } from "next";

import { ProductPage } from "@/components/pages/product-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Product",
  description: "Coming-soon generator concept: connect GitHub, connect Vercel, and get a production-ready portfolio baseline.",
  path: "/product"
});

export default function ProductRoutePage() {
  return <ProductPage />;
}
