import type { InputHTMLAttributes } from "react";

import { focusVisibleRingClass, interactiveFieldClass } from "@/components/ui/foundation";
import { cn } from "@/lib/utils/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md px-3 text-sm outline-none ring-focus/55 placeholder:text-foreground/45 focus:border-primary focus:ring-2",
        interactiveFieldClass,
        focusVisibleRingClass,
        className
      )}
      {...props}
    />
  );
}
