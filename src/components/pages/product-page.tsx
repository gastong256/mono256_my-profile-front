"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { productContent } from "@/content/product";
import { WindowPageShell } from "@/components/layout/window-page-shell";
import { Button } from "@/components/ui/button";

export function ProductPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <WindowPageShell
        title="BuildYours.exe"
        subtitle="Overview"
        windowBodyClassName="pt-3 md:pt-4 lg:pt-3"
        status="interactive"
        help={{
          section: "Product Overview",
          path: "~/BuildYours.exe/overview",
          items: [
            "Review the problem framing, coming-soon status, and install flow.",
            "Accept the agreement and continue to the connection preview."
          ],
          cta: {
            label: "Go To Connections",
            href: "/create"
          }
        }}
      >
        <div className="md:h-full md:overflow-y-auto">
          <div className="flex min-h-full flex-col">
            <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">Step 1 of 2 · Product overview</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{productContent.headline}</h1>
            <p className="mt-2 max-w-3xl text-sm text-foreground/75 md:text-base">{productContent.description}</p>

            <p className="mt-4 text-base font-medium text-foreground/90 lg:mt-3 lg:text-[15px]">{productContent.promise}</p>

            <section className="mt-5 rounded-lg border border-border/80 bg-surface/70 p-4 md:p-5 lg:mt-4 lg:p-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-brand">Installation flow</p>
              <ol className="mt-3 grid gap-3 md:grid-cols-3 lg:mt-2.5 lg:gap-2.5">
                {productContent.steps.map((step, index) => (
                  <li key={step.title} className="rounded-md border border-border/80 bg-background/25 p-3 lg:p-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">Step {index + 1}</p>
                    <p className="mt-1.5 text-sm font-semibold text-foreground lg:mt-1">{step.title}</p>
                    <p className="mt-1 text-xs text-foreground/75 md:text-sm lg:text-[13px]">{step.description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-4 rounded-lg border border-border/80 bg-background/20 p-4 md:p-5 lg:mt-3 lg:p-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">Agreement</p>
              <div className="mt-2.5 space-y-2.5 text-sm text-foreground/80 lg:mt-2 lg:space-y-2 lg:text-[13px]">
                <p>
                  This is a product preview. The public generator release is coming soon.
                </p>
                <p>{productContent.agreementLabel}</p>
              </div>

              <label className="mt-3 flex cursor-pointer items-start gap-3 border-t border-border/60 pt-3 lg:mt-2.5 lg:pt-2.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border bg-background text-brand focus:ring-brand/50"
                />
                <span className="text-sm font-medium text-foreground/90">I agree</span>
              </label>
            </section>

            <div className="mt-auto flex flex-wrap items-center justify-end gap-3 border-t border-border/70 pt-3 lg:pt-2.5">
              <Button type="button" onClick={() => router.push("/create")} disabled={!agreed} className="min-w-36">
                Continue to preview
              </Button>
            </div>
          </div>
        </div>
      </WindowPageShell>
  );
}
