import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <PageContainer className="py-20">
      <div className="rounded-lg border border-border bg-surface p-10 text-center shadow-card">
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-foreground/75">The page you requested does not exist or has moved.</p>
        <Link href="/" className={`${buttonVariants({ variant: "primary", size: "md" })} mt-6`}>
          Return home
        </Link>
      </div>
    </PageContainer>
  );
}
