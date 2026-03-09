type StatusPillTone = "neutral" | "neutral-soft" | "success" | "brand";

const toneClassByType: Record<StatusPillTone, string> = {
  neutral: "border-foreground/20 bg-foreground/10 text-foreground/70",
  "neutral-soft": "border-foreground/20 bg-foreground/10 text-foreground/80",
  success: "border-success/40 bg-success-subtle/70 text-success",
  brand: "border-brand/40 bg-brand/15 text-brand"
};

export function statusPillClassName(baseClassName: string, tone: StatusPillTone): string {
  return `${baseClassName} ${toneClassByType[tone]}`;
}
