import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm outline-none ring-brand/30 placeholder:text-foreground/45 focus:ring-2",
        className
      )}
      {...props}
    />
  );
}
