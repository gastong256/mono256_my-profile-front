import Link from "next/link";

import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import { buttonVariants } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <WindowPageShell
      title="Not Found"
      subtitle="/404"
      status="read-only"
      help={{
        section: "Not Found",
        path: "~/404",
        items: [
          "The requested path is not available.",
          "Return to home workspace and continue navigation."
        ],
        cta: {
          label: "Return Home",
          href: "/"
        }
      }}
      windowBodyClassName="p-10 text-center"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-foreground/75">The page you requested does not exist or has moved.</p>
      <Link href="/" className={`${buttonVariants({ variant: "primary", size: "md" })} mt-6`}>
        Return home
      </Link>
    </WindowPageShell>
  );
}
