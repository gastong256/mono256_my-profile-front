import type { Metadata } from "next";
import Link from "next/link";

import { WindowPageShell } from "@/components/layout/window-page-shell";
import { buttonVariants } from "@/components/ui/button";
import { productContent } from "@/content/product";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Result",
  description: "Preview summary of expected generator deliverables and implementation documentation.",
  path: "/result"
});

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "installation-summary" }];
}

type ResultPageProps = {
  params: {
    id: string;
  };
};

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <WindowPageShell
        title="BuildYours.exe"
        subtitle="Summary"
        status="external-links"
        help={{
          section: "Result",
          path: `~/BuildYours.exe/result/${params.id}`,
          items: [
            "Review preview deliverables and baseline output references.",
            "Open documentation links for planning the coming-soon release."
          ],
          cta: {
            label: "Run Again",
            href: "/create"
          }
        }}
      >
        <div className="h-full overflow-y-auto">
          <div className="flex min-h-full flex-col">
            <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">Result summary</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{productContent.resultTitle}</h1>
            <p className="mt-2 max-w-3xl text-sm text-foreground/75 md:text-base">{productContent.resultDescription}</p>

            <section className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">Deliverables</p>
              <div className="mt-2 grid gap-4 md:grid-cols-2">
                <Link
                  href={productContent.deliverables.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-brand/40 bg-brand/10 p-5 transition-colors hover:bg-brand/15"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">Primary Output</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{productContent.deliverables.websiteLabel}</p>
                  <p className="mt-1 text-sm text-foreground/75">{productContent.deliverables.websiteUrl}</p>
                </Link>

                <Link
                  href={productContent.deliverables.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-brand/30 bg-surface/85 p-5 transition-colors hover:border-brand/45"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">Source Output</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{productContent.deliverables.repositoryLabel}</p>
                  <p className="mt-1 text-sm text-foreground/75">{productContent.deliverables.repositoryUrl}</p>
                </Link>
              </div>
            </section>

            <section className="mt-5 rounded-lg border border-border/70 bg-background/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground/65">Documentation</p>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground/75">
                {productContent.docs.map((doc) => (
                  <li key={doc.label}>
                    <Link href={doc.href} target="_blank" rel="noreferrer">
                      {doc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
              <Link href="/create" className={buttonVariants({ variant: "secondary", size: "md" })}>
                Back to preview
              </Link>
              <Link
                href={productContent.deliverables.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "primary", size: "md" })}
              >
                Open baseline site
              </Link>
            </div>
          </div>
        </div>
      </WindowPageShell>
  );
}
