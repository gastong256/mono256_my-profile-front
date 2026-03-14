import type { Metadata } from "next";
import Link from "next/link";

import { ExternalLink } from "@/components/shared/primitives/external-link";
import {
  windowFillColumnClass,
  windowScrollContainerClass,
} from "@/components/shared/window/foundation";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import { buttonVariants } from "@/components/ui/button";
import { productContent } from "@/content/product";
import { createPageMetadata } from "@/lib/metadata";

type ResultPageProps = {
  params: {
    id: string;
  };
};

export function generateMetadata({ params }: ResultPageProps): Metadata {
  return createPageMetadata({
    title: "Result",
    description:
      "Preview summary of expected generator deliverables and implementation documentation.",
    path: `/result/${params.id}`,
  });
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "installation-summary" }];
}

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <WindowPageShell
      title="BuildYours.exe"
      subtitle="Summary"
      windowBodyClassName="p-5 md:p-6 lg:p-4"
      status="external-links"
      help={{
        section: "Result",
        path: `~/BuildYours.exe/result/${params.id}`,
        items: [
          "Review preview deliverables and baseline output references.",
          "Open documentation links for planning the coming-soon release.",
        ],
        cta: {
          label: "Run Again",
          href: "/create",
        },
      }}
    >
      <div className={windowScrollContainerClass}>
        <div className={windowFillColumnClass}>
          <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">
            Result summary
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {productContent.resultTitle}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-foreground/75 md:text-base">
            {productContent.resultDescription}
          </p>

          <section className="mt-6 lg:mt-4">
            <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">
              Deliverables
            </p>
            <div className="mt-2 grid gap-4 md:grid-cols-2 lg:gap-3">
              <ExternalLink
                href={productContent.deliverables.websiteUrl}
                className="rounded-lg border border-brand/40 bg-brand/10 p-5 transition-colors hover:bg-brand/15 lg:p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Primary Output
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {productContent.deliverables.websiteLabel}
                </p>
                <p className="mt-1 text-sm text-foreground/75">
                  {productContent.deliverables.websiteUrl}
                </p>
              </ExternalLink>

              <ExternalLink
                href={productContent.deliverables.repositoryUrl}
                className="rounded-lg border border-brand/30 bg-surface/85 p-5 transition-colors hover:border-brand/45 lg:p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Source Output
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {productContent.deliverables.repositoryLabel}
                </p>
                <p className="mt-1 text-sm text-foreground/75">
                  {productContent.deliverables.repositoryUrl}
                </p>
              </ExternalLink>
            </div>
          </section>

          <section className="mt-5 rounded-lg border border-border/70 bg-background/20 p-4 lg:mt-4 lg:p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/65">
              Documentation
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/75">
              {productContent.docs.map((doc) => (
                <li key={doc.label}>
                  <ExternalLink href={doc.href}>{doc.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4 lg:pt-3">
            <Link
              href="/create"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Back to preview
            </Link>
            <ExternalLink
              href={productContent.deliverables.websiteUrl}
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Open baseline site
            </ExternalLink>
          </div>
        </div>
      </div>
    </WindowPageShell>
  );
}
