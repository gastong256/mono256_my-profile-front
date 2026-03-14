import type { DeliveryStatus, ReviewStatus } from "@/types/api";
import {
  statusPillBaseClassName,
  statusPillClassName,
} from "@/components/ui/status-pill";
import { cn } from "@/lib/utils/cn";

export function ReviewStatusBadge({ value }: { value: ReviewStatus }) {
  return (
    <span className={reviewStatusClassName(value)}>
      {value.replace("_", " ")}
    </span>
  );
}

export function DeliveryStatusBadge({ value }: { value: DeliveryStatus }) {
  return <span className={deliveryStatusClassName(value)}>{value}</span>;
}

function reviewStatusClassName(value: ReviewStatus) {
  if (value === "RESOLVED") {
    return statusPillClassName(statusPillBaseClassName, "success");
  }

  if (value === "NEW") {
    return statusPillClassName(statusPillBaseClassName, "brand");
  }

  if (value === "IN_REVIEW") {
    return statusPillClassName(statusPillBaseClassName, "neutral-soft");
  }

  return cn(
    statusPillBaseClassName,
    "border-foreground/20 bg-foreground/8 text-foreground/55"
  );
}

function deliveryStatusClassName(value: DeliveryStatus) {
  if (value === "SENT") {
    return statusPillClassName(statusPillBaseClassName, "success");
  }

  if (value === "PENDING") {
    return statusPillClassName(statusPillBaseClassName, "brand");
  }

  if (value === "SKIPPED") {
    return statusPillClassName(statusPillBaseClassName, "neutral-soft");
  }

  return cn(
    statusPillBaseClassName,
    "border-[#f0c674]/35 bg-[#f0c674]/10 text-[#f0c674]"
  );
}
