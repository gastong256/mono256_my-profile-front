import Link from "next/link";

import { productContent } from "@/content/product";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

import { PageContainer } from "@/components/layout/page-container";

export function ProductTeaser() {
  return (
    <section className="mt-16 md:mt-24">
      <PageContainer>
        <SectionTitle overline="Product" title={productContent.headline} description={productContent.description} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {productContent.steps.map((step, index) => (
            <Card key={step.title}>
              <p className="text-sm font-semibold text-brand">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm text-foreground/75">{step.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/product" className="text-sm font-semibold">
            Read full product details
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
