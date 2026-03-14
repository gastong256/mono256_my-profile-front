import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/35 bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary",
        className
      )}
      {...props}
    />
  );
}
