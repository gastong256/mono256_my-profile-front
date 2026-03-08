import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { productContent } from "@/content/product";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Create",
  description: "Product creation flow placeholder for the generator onboarding experience.",
  path: "/create"
});

export default function CreatePage() {
  return (
    <PageContainer className="py-14 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Create your website</h1>
      <p className="mt-4 max-w-2xl text-sm text-foreground/75 md:text-base">
        This route is the product boundary for the upcoming automated generator flow.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {productContent.steps.map((step, index) => (
          <Card key={step.title}>
            <p className="text-sm font-semibold text-brand">Step {index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold">{step.title}</h2>
            <p className="mt-3 text-sm text-foreground/75">{step.description}</p>
          </Card>
        ))}
      </div>

      <Link href="/product" className={`${buttonVariants({ variant: "secondary", size: "md" })} mt-8`}>
        Back to Product Overview
      </Link>
    </PageContainer>
  );
}
