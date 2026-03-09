import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";
import { focusVisibleRingClass, interactiveStateClass } from "@/components/ui/foundation";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function buttonVariants({
  variant = "primary",
  size = "md"
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
} = {}) {
  const base =
    cn("inline-flex items-center justify-center rounded-md border font-medium", interactiveStateClass, focusVisibleRingClass);

  const variantClass: Record<ButtonVariant, string> = {
    primary: "border-primary bg-cta text-cta-foreground hover:bg-primary-hover active:bg-primary-active",
    secondary: "border-interactive-border bg-interactive-subtle text-foreground hover:bg-nav-hover active:bg-nav-active",
    ghost: "border-transparent text-foreground hover:border-interactive-border hover:bg-nav-hover active:bg-nav-active"
  };

  const sizeClass: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-base"
  };

  return cn(base, variantClass[variant], sizeClass[size]);
}

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
