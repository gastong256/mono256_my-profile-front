import Link from "next/link";

import { productContent } from "@/content/product";
import { siteContent } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

import { PageContainer } from "@/components/layout/page-container";

export function ProductPage() {
  return (
    <PageContainer className="py-14 md:py-20">
      <SectionTitle overline="Product" title={productContent.headline} description={productContent.description} />

      <div className="mt-8 rounded-lg border border-border bg-surface p-6 shadow-card">
        <p className="text-lg font-semibold">{productContent.promise}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {productContent.steps.map((step, index) => (
          <Card key={step.title}>
            <p className="text-sm font-semibold text-brand">{index + 1}. {step.title}</p>
            <p className="mt-3 text-sm text-foreground/75">{step.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/create" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Open Create Flow
        </Link>
        <Link href={`mailto:${siteContent.contactEmail}`} className={buttonVariants({ variant: "secondary", size: "lg" })}>
          Discuss the roadmap
        </Link>
      </div>
    </PageContainer>
  );
}
