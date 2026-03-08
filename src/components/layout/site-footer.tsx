import { siteContent } from "@/content/site";
import { SocialLinks } from "@/components/shared/social-links";

import { PageContainer } from "./page-container";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <PageContainer className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground/70">© {new Date().getFullYear()} {siteContent.name}. All rights reserved.</p>
        <SocialLinks />
      </PageContainer>
    </footer>
  );
}
