import Link from "next/link";

import { siteContent } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

import { PageContainer } from "./page-container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          {siteContent.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteContent.navigation.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-foreground/85 hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/create" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "hidden md:inline-flex")}>
          Build Yours
        </Link>
      </PageContainer>
    </header>
  );
}
