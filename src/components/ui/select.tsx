import type { SelectHTMLAttributes } from "react";

import { focusVisibleRingClass, interactiveFieldClass } from "@/components/ui/foundation";
import { cn } from "@/lib/utils/cn";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md px-3 text-sm outline-none ring-focus/55 focus:border-primary focus:ring-2",
        interactiveFieldClass,
        focusVisibleRingClass,
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
