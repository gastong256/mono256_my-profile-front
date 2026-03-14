"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import { windowBodyResetClass } from "@/components/shared/window/foundation";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { status } = useAdminAuth();

  useEffect(() => {
    if (status !== "unauthenticated") {
      return;
    }

    const currentPath = pathname ?? "/admin";
    const currentQuery = searchParams.toString();
    const nextValue = currentQuery
      ? `${currentPath}?${currentQuery}`
      : currentPath;
    router.replace(`/admin/login?next=${encodeURIComponent(nextValue)}`);
  }, [pathname, router, searchParams, status]);

  if (status !== "authenticated") {
    return (
      <WindowPageShell
        title="Admin.secure"
        subtitle="Session"
        status="interactive"
        windowBodyClassName={windowBodyResetClass}
      >
        <section className="flex min-h-[420px] items-center justify-center bg-[linear-gradient(180deg,#18243b_0%,#1c3456_30%,#2f4f73_100%)] p-6">
          <div className="max-w-md rounded-xl border border-border/80 bg-surface/95 p-6 text-center shadow-card">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
              Admin session
            </p>
            <h1 className="mt-2 text-xl font-semibold text-foreground">
              {status === "loading"
                ? "Verifying your session"
                : "Redirecting to login"}
            </h1>
            <p className="mt-2 text-sm text-foreground/72">
              {status === "loading"
                ? "Please wait while we confirm your admin access."
                : "Your admin session is no longer available."}
            </p>
          </div>
        </section>
      </WindowPageShell>
    );
  }

  return <>{children}</>;
}
