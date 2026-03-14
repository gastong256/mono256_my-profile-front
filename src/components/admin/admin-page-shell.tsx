"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import { windowBodyResetClass } from "@/components/shared/window/foundation";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type AdminPageShellProps = {
  title: string;
  subtitle?: string;
  description: string;
  children: React.ReactNode;
};

export function AdminPageShell({ title, subtitle, description, children }: AdminPageShellProps) {
  const router = useRouter();
  const { user, logout } = useAdminAuth();

  function handleLogout() {
    logout();
    router.replace("/admin/login");
  }

  return (
    <WindowPageShell
      title={title}
      subtitle={subtitle}
      status="interactive"
      windowBodyClassName={windowBodyResetClass}
      actions={
        <div className="flex items-center gap-1.5">
          <Link href="/admin" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Inbox
          </Link>
          <Button type="button" variant="secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      }
      help={{
        section: "Admin",
        path: "~/admin",
        items: [
          "Review incoming contact submissions and current delivery state.",
          "Open a submission to inspect the full message and update its review status."
        ]
      }}
    >
      <section className="min-h-[580px] bg-[linear-gradient(180deg,#18243b_0%,#1c3456_25%,#2f4f73_100%)] p-4 md:p-6 lg:p-5">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-3">
          <div className={cn("rounded-xl border border-border/80 bg-surface/95 p-4 shadow-card", "md:flex md:items-center md:justify-between")}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">Private admin</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
              <p className="mt-1 text-sm text-foreground/72">{description}</p>
            </div>
            {user ? (
              <div className="mt-3 rounded-lg border border-border/80 bg-background/30 px-3 py-2 md:mt-0">
                <p className="text-xs font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-foreground/65">{user.email}</p>
              </div>
            ) : null}
          </div>

          {children}
        </div>
      </section>
    </WindowPageShell>
  );
}
