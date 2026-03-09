import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-background/60 px-3 text-sm text-foreground outline-none ring-brand/30 placeholder:text-foreground/45 focus:border-brand/60 focus:ring-2",
        className
      )}
      {...props}
    />
  );
}
