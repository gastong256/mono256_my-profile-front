import { windowBodyResetClass } from "@/components/shared/window/foundation";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";

export function AdminRouteFallback({ title }: { title: string }) {
  return (
    <WindowPageShell
      title={title}
      subtitle="Loading"
      status="interactive"
      windowBodyClassName={windowBodyResetClass}
    >
      <section className="flex min-h-[520px] items-center justify-center bg-[linear-gradient(180deg,#18243b_0%,#1c3456_30%,#2f4f73_100%)] p-6">
        <div className="rounded-xl border border-border/80 bg-surface/95 px-6 py-5 text-center shadow-card">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
            Admin
          </p>
          <p className="mt-2 text-sm text-foreground/72">
            Preparing the admin interface...
          </p>
        </div>
      </section>
    </WindowPageShell>
  );
}
