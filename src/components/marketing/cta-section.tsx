import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { PageContainer } from "@/components/layout/page-container";

export function CtaSection() {
  return (
    <section className="mb-8 mt-16 md:mb-12 md:mt-24">
      <PageContainer>
        <div className="rounded-2xl border border-border bg-foreground px-8 py-10 text-background md:flex md:items-center md:justify-between md:px-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Ready to ship your personal website fast?</h2>
            <p className="mt-3 max-w-2xl text-sm text-background/80 md:text-base">
              Start with this profile site today, then evolve to the two-click generator as new product features launch.
            </p>
          </div>
          <div className="mt-6 flex gap-3 md:mt-0">
            <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Contact Me
            </Link>
            <Link href="/create" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Try Create Flow
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
