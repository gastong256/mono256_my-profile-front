"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { focusVisibleRingClass } from "@/components/ui/foundation";
import { useHeaderUi } from "@/components/layout/header-ui-provider";
import { statusPillClassName } from "@/components/ui/status-pill";
import { cn } from "@/lib/utils/cn";

export type SystemToastTone = "success" | "error" | "warning" | "info";

type SystemToast = {
  id: number;
  dedupeKey: string;
  title: string;
  message: string;
  tone: SystemToastTone;
};

type ShowSystemToastInput = {
  dedupeKey?: string;
  title?: string;
  message: string;
  tone?: SystemToastTone;
  durationMs?: number;
  persist?: boolean;
};

type SystemToastContextValue = {
  showToast: (input: ShowSystemToastInput) => void;
  dismissToast: (id: number) => void;
};

const SystemToastContext = createContext<SystemToastContextValue | null>(null);

let nextToastId = 1;

const DEFAULT_TOAST_DURATION_BY_TONE: Record<SystemToastTone, number> = {
  success: 8_000,
  warning: 11_000,
  error: 11_000,
  info: 8_000,
};

const COMPACT_TOAST_DURATION_BY_TONE: Record<SystemToastTone, number> = {
  success: 6_500,
  warning: 9_000,
  error: 9_000,
  info: 6_500,
};

const defaultTitleByTone: Record<SystemToastTone, string> = {
  success: "Operation completed",
  error: "System notice",
  warning: "Attention required",
  info: "System notice",
};

function statusToneClassName(tone: SystemToastTone) {
  const base =
    "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em]";

  if (tone === "success") {
    return statusPillClassName(base, "success");
  }

  if (tone === "info") {
    return statusPillClassName(base, "brand");
  }

  if (tone === "warning") {
    return `${base} border-[#f0c674]/35 bg-[#f0c674]/14 text-[#f0c674]`;
  }

  return `${base} border-[#f38ba8]/35 bg-[#f38ba8]/14 text-[#f5a3b7]`;
}

function accentClassName(tone: SystemToastTone) {
  if (tone === "success") {
    return "bg-success";
  }

  if (tone === "info") {
    return "bg-brand";
  }

  if (tone === "warning") {
    return "bg-[#f0c674]";
  }

  return "bg-[#f38ba8]";
}

function toastSurfaceClassName(tone: SystemToastTone) {
  if (tone === "success") {
    return "border-[#2b8a5a]/70 bg-[linear-gradient(180deg,rgba(22,76,52,0.97)_0%,rgba(15,58,40,0.98)_100%)] text-[#def7e8]";
  }

  if (tone === "info") {
    return "border-brand/60 bg-[linear-gradient(180deg,rgba(24,62,112,0.97)_0%,rgba(16,44,85,0.98)_100%)] text-[#e2efff]";
  }

  if (tone === "warning") {
    return "border-[#a06a17]/70 bg-[linear-gradient(180deg,rgba(97,63,14,0.97)_0%,rgba(74,47,10,0.98)_100%)] text-[#fff0c8]";
  }

  return "border-[#a04c61]/70 bg-[linear-gradient(180deg,rgba(102,34,50,0.97)_0%,rgba(78,24,38,0.98)_100%)] text-[#ffe1e8]";
}

function toastSecondaryTextClassName(tone: SystemToastTone) {
  if (tone === "success") {
    return "text-[#def7e8]/78";
  }

  if (tone === "info") {
    return "text-[#e2efff]/76";
  }

  if (tone === "warning") {
    return "text-[#fff0c8]/78";
  }

  return "text-[#ffe1e8]/78";
}

function labelByTone(tone: SystemToastTone) {
  if (tone === "success") {
    return "success";
  }

  if (tone === "warning") {
    return "warning";
  }

  return "notice";
}

function buildToastDedupeKey({
  dedupeKey,
  tone,
  title,
  message,
}: {
  dedupeKey?: string;
  tone: SystemToastTone;
  title: string;
  message: string;
}) {
  return dedupeKey ?? `${tone}:${title}:${message}`;
}

export function SystemToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobileMenuOpen } = useHeaderUi();
  const [isDesktopToastViewport, setIsDesktopToastViewport] = useState(false);
  const [toasts, setToasts] = useState<SystemToast[]>([]);
  const timeoutIdsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function syncViewport(event?: MediaQueryListEvent) {
      setIsDesktopToastViewport(event?.matches ?? mediaQuery.matches);
    }

    syncViewport();

    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  const dismissToast = useCallback((id: number) => {
    const timeoutId = timeoutIdsRef.current.get(id);

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutIdsRef.current.delete(id);
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const scheduleToastDismiss = useCallback(
    (id: number, durationMs: number) => {
      const existingTimeoutId = timeoutIdsRef.current.get(id);

      if (existingTimeoutId) {
        clearTimeout(existingTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        dismissToast(id);
      }, durationMs);

      timeoutIdsRef.current.set(id, timeoutId);
    },
    [dismissToast]
  );

  const showToast = useCallback(
    ({
      dedupeKey,
      title,
      message,
      tone = "info",
      durationMs,
      persist = false,
    }: ShowSystemToastInput) => {
      const resolvedTitle = title ?? defaultTitleByTone[tone];
      const resolvedDedupeKey = buildToastDedupeKey({
        dedupeKey,
        tone,
        title: resolvedTitle,
        message,
      });
      let toastId: number | null = null;

      setToasts((current) => {
        const existingToast = current.find(
          (toast) => toast.dedupeKey === resolvedDedupeKey
        );

        if (existingToast) {
          toastId = existingToast.id;

          return current.map((toast) =>
            toast.id === existingToast.id
              ? {
                  ...toast,
                  title: resolvedTitle,
                  message,
                  tone,
                }
              : toast
          );
        }

        const id = nextToastId++;
        toastId = id;

        return [
          ...current,
          {
            id,
            dedupeKey: resolvedDedupeKey,
            title: resolvedTitle,
            message,
            tone,
          },
        ];
      });

      if (!toastId) {
        return;
      }

      if (persist) {
        if (!isDesktopToastViewport) {
          scheduleToastDismiss(
            toastId,
            durationMs ?? COMPACT_TOAST_DURATION_BY_TONE[tone]
          );
          return;
        }

        const existingTimeoutId = timeoutIdsRef.current.get(toastId);

        if (existingTimeoutId) {
          clearTimeout(existingTimeoutId);
          timeoutIdsRef.current.delete(toastId);
        }

        return;
      }

      scheduleToastDismiss(
        toastId,
        durationMs ??
          (isDesktopToastViewport
            ? DEFAULT_TOAST_DURATION_BY_TONE[tone]
            : COMPACT_TOAST_DURATION_BY_TONE[tone])
      );
    },
    [isDesktopToastViewport, scheduleToastDismiss]
  );

  const clearToastTimeouts = useCallback(
    (timeoutIds: Map<number, ReturnType<typeof setTimeout>>) => {
      for (const timeoutId of timeoutIds.values()) {
        clearTimeout(timeoutId);
      }

      timeoutIds.clear();
    },
    []
  );

  useEffect(() => {
    const timeoutIds = timeoutIdsRef.current;

    return () => {
      clearToastTimeouts(timeoutIds);
    };
  }, [clearToastTimeouts]);

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [dismissToast, showToast]
  );

  return (
    <SystemToastContext.Provider value={value}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed right-3 top-[4.75rem] z-50 flex w-[min(20.5rem,calc(100vw-1rem))] flex-col gap-2.5 transition-opacity duration-150 md:right-4 md:top-[5.25rem] md:w-[21rem] lg:bottom-12 lg:right-5 lg:top-auto lg:w-[21.5rem] lg:gap-3",
          isMobileMenuOpen ? "invisible opacity-0" : "visible opacity-100"
        )}
        aria-hidden={isMobileMenuOpen}
      >
        {toasts.map((toast) => (
          <section
            key={toast.id}
            role={toast.tone === "error" ? "alert" : "status"}
            aria-live={toast.tone === "error" ? "assertive" : "polite"}
            className={cn(
              "pointer-events-auto overflow-hidden rounded-[6px] border shadow-[0_18px_38px_rgba(0,0,0,0.34)] backdrop-blur-xl",
              toastSurfaceClassName(toast.tone)
            )}
            aria-label={`${toast.title}. ${toast.message}`}
          >
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2.5 text-left lg:hidden",
                focusVisibleRingClass
              )}
              aria-label={`Dismiss notification: ${toast.title}`}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-flex h-8 w-1.5 shrink-0 rounded-full",
                  accentClassName(toast.tone)
                )}
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      statusToneClassName(toast.tone),
                      "border-white/18 bg-white/10 text-current"
                    )}
                  >
                    {labelByTone(toast.tone)}
                  </span>
                  <p className="min-w-0 text-sm font-semibold tracking-tight text-current">
                    {toast.title}
                  </p>
                </div>
              </div>
            </button>

            <div className="hidden lg:flex lg:items-start lg:gap-2.5 lg:px-3.5 lg:py-3">
              <div className="flex min-w-0 flex-1 items-start gap-2.5">
                <span
                  aria-hidden
                  className={cn(
                    "mt-1.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_12px_currentColor]",
                    accentClassName(toast.tone)
                  )}
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={statusToneClassName(toast.tone)}>
                      {labelByTone(toast.tone)}
                    </span>
                    <p
                      className={cn(
                        "truncate text-[11px] font-mono uppercase tracking-[0.14em]",
                        toastSecondaryTextClassName(toast.tone)
                      )}
                    >
                      system notification
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-semibold tracking-tight text-current">
                    {toast.title}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm leading-5",
                      toastSecondaryTextClassName(toast.tone)
                    )}
                  >
                    {toast.message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/62 transition-colors hover:bg-white/10 hover:text-foreground",
                  focusVisibleRingClass
                )}
                aria-label="Dismiss notification"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M4 4l8 8M12 4 4 12" />
                </svg>
              </button>
            </div>
          </section>
        ))}
      </div>
    </SystemToastContext.Provider>
  );
}

export function useSystemToast() {
  const value = useContext(SystemToastContext);

  if (!value) {
    throw new Error("useSystemToast must be used within SystemToastProvider");
  }

  return value;
}
