import Link from "next/link";

import { profileContent } from "@/content/profile";
import { productContent } from "@/content/product";
import { siteContent } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

import { PageContainer } from "@/components/layout/page-container";

export function HeroSection() {
  return (
    <section className="pt-16 md:pt-24">
      <PageContainer>
        <div className="rounded-2xl border border-border/80 bg-surface/95 p-8 shadow-card md:p-12">
          <Badge>{profileContent.role}</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            {siteContent.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base text-foreground/75 md:text-lg">{profileContent.summary}</p>
          <p className="mt-4 max-w-3xl text-sm font-medium text-foreground/80 md:text-base">{productContent.promise}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Explore Projects
            </Link>
            <Link href="/product" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
              See Product Vision
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
