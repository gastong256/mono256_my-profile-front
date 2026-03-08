import type { Metadata } from "next";

import { CtaSection } from "@/components/marketing/cta-section";
import { FeaturedProjects } from "@/components/marketing/featured-projects";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProductTeaser } from "@/components/marketing/product-teaser";
import { ProofSection } from "@/components/marketing/proof-section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description: "Professional personal website and product entrypoint for mono256_my-profile.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofSection />
      <FeaturedProjects />
      <ProductTeaser />
      <CtaSection />
    </>
  );
}
