import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { WindowFrame } from "@/components/ui/window-frame";

export default function NotFoundPage() {
  return (
    <PageContainer className="flex h-full min-h-0 flex-col py-1 md:py-2">
      <WindowFrame
        title="Not Found"
        subtitle="/404"
        size="fixed"
        className="w-full"
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
        bodyClassName="p-10 text-center"
      >
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-foreground/75">The page you requested does not exist or has moved.</p>
        <Link href="/" className={`${buttonVariants({ variant: "primary", size: "md" })} mt-6`}>
          Return home
        </Link>
      </WindowFrame>
    </PageContainer>
  );
}
