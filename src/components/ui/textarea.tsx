import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none ring-brand/30 placeholder:text-foreground/45 focus:border-brand/60 focus:ring-2",
        className
      )}
      {...props}
    />
  );
}
