import { productContent } from "@/content/product";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import {
  windowFillColumnClass,
  windowScrollContainerClass,
} from "@/components/shared/window/foundation";

import { ProductOverviewActions } from "./product-overview-actions";

export function ProductPage() {
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
          "Accept the agreement and continue to the connection preview.",
        ],
        cta: {
          label: "Go To Connections",
          href: "/create",
        },
      }}
    >
      <div className={windowScrollContainerClass}>
        <div className={windowFillColumnClass}>
          <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">
            Step 1 of 2 · Product overview
          </p>
          <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight md:text-3xl">
            {productContent.headline}
          </h1>
          <p className="mt-2 max-w-3xl break-words text-sm text-foreground/75 md:text-base">
            {productContent.description}
          </p>

          <p className="mt-4 break-words text-base font-medium text-foreground/90 lg:mt-3 lg:text-[15px]">
            {productContent.promise}
          </p>

          <section className="mt-5 min-w-0 rounded-lg border border-border/80 bg-surface/70 p-4 md:p-5 lg:mt-4 lg:p-4">
            <p className="font-mono text-[11px] uppercase tracking-wide text-brand">
              Installation flow
            </p>
            <ol className="mt-3 grid min-w-0 gap-3 md:grid-cols-3 lg:mt-2.5 lg:gap-2.5">
              {productContent.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="min-w-0 rounded-md border border-border/80 bg-background/25 p-3 lg:p-2.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                    Step {index + 1}
                  </p>
                  <p className="mt-1.5 break-words text-sm font-semibold text-foreground lg:mt-1">
                    {step.title}
                  </p>
                  <p className="mt-1 break-words text-xs text-foreground/75 md:text-sm lg:text-[13px]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <ProductOverviewActions
            agreementLabel={productContent.agreementLabel}
          />
        </div>
      </div>
    </WindowPageShell>
  );
}
