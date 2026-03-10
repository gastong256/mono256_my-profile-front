"use client";

import { useEffect, useState } from "react";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit"
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric"
});

export function HeaderClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const timeLabel = now ? timeFormatter.format(now) : "--:--";
  const dateLabel = now ? dateFormatter.format(now) : "--- -- ----";

  return (
    <p className="justify-self-center whitespace-nowrap font-mono text-[11px] text-foreground/80 md:text-xs" suppressHydrationWarning>
      {timeLabel}
      <span className="mx-2 text-foreground/45">•</span>
      {dateLabel}
    </p>
  );
}

