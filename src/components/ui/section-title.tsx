import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SectionTitleProps = {
  overline?: string;
  title: string;
  description?: string;
  className?: string;
  actions?: ReactNode;
};

export function SectionTitle({ overline, title, description, className, actions }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-end md:justify-between", className)}>
      <div className="space-y-2">
        {overline ? <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{overline}</p> : null}
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-foreground/75 md:text-base">{description}</p> : null}
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
