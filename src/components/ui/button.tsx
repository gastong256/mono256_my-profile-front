import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

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
    "inline-flex items-center justify-center rounded-md border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:pointer-events-none disabled:opacity-50";

  const variantClass: Record<ButtonVariant, string> = {
    primary: "border-brand bg-brand text-brand-foreground hover:bg-brand/90",
    secondary: "border-border bg-surface text-foreground hover:bg-background/80",
    ghost: "border-transparent text-foreground hover:border-border hover:bg-background/70"
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
