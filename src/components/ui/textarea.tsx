import type { TextareaHTMLAttributes } from "react";

import { focusVisibleRingClass, interactiveFieldClass } from "@/components/ui/foundation";
import { cn } from "@/lib/utils/cn";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-md px-3 py-2 text-sm outline-none ring-focus/55 placeholder:text-foreground/45 focus:border-primary focus:ring-2",
        interactiveFieldClass,
        focusVisibleRingClass,
        className
      )}
      {...props}
    />
  );
}
