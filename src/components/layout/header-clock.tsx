"use client";

import { useEffect, useMemo, useState } from "react";

export function HeaderClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const timeLabel = useMemo(
    () =>
      now
        ? new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          }).format(now)
        : "--:--",
    [now]
  );

  const dateLabel = useMemo(
    () =>
      now
        ? new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          }).format(now)
        : "--- -- ----",
    [now]
  );

  return (
    <p className="justify-self-center whitespace-nowrap font-mono text-[11px] text-foreground/80 md:text-xs" suppressHydrationWarning>
      {timeLabel}
      <span className="mx-2 text-foreground/45">•</span>
      {dateLabel}
    </p>
  );
}
