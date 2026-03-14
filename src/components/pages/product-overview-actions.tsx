"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type ProductOverviewActionsProps = {
  agreementLabel: string;
};

export function ProductOverviewActions({
  agreementLabel,
}: ProductOverviewActionsProps) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <section className="mt-4 min-w-0 rounded-lg border border-border/80 bg-background/20 p-4 md:p-5 lg:mt-3 lg:p-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">
          Agreement
        </p>
        <div className="mt-2.5 space-y-2.5 text-sm text-foreground/80 lg:mt-2 lg:space-y-2 lg:text-[13px]">
          <p>
            This is a product preview. The public generator release is coming
            soon.
          </p>
          <p className="break-words">{agreementLabel}</p>
        </div>

        <label className="mt-3 flex cursor-pointer items-start gap-3 border-t border-border/60 pt-3 lg:mt-2.5 lg:pt-2.5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border bg-background text-brand focus:ring-brand/50"
          />
          <span className="text-sm font-medium text-foreground/90">
            I agree
          </span>
        </label>
      </section>

      <div className="mt-auto flex flex-wrap items-center justify-end gap-3 border-t border-border/70 pt-3 lg:pt-2.5">
        <Button
          type="button"
          onClick={() => router.push("/create")}
          disabled={!agreed}
          className="min-w-36"
        >
          Continue to preview
        </Button>
      </div>
    </>
  );
}
