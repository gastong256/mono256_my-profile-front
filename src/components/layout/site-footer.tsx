import Link from "next/link";

import { siteContent } from "@/content/site";
import { focusVisibleRingClass, iconInteractiveClass } from "@/components/ui/foundation";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons/social-icons";
import { cn } from "@/lib/utils/cn";

import { PageContainer } from "./page-container";

type SocialItem = {
  label: "Email" | "GitHub" | "LinkedIn";
  href: string;
};

const releaseLabel = "v0.1.3";

const socialItems: SocialItem[] = [
  { label: "Email", href: `mailto:${siteContent.contactEmail}` },
  { label: "GitHub", href: siteContent.github },
  { label: "LinkedIn", href: siteContent.linkedin }
];

export function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-interactive-border/70 bg-background/45">
      <PageContainer className="py-1">
        <div className="flex items-center justify-between gap-3 text-[10px] text-foreground/55 md:text-[11px]">
          <p className="whitespace-nowrap font-mono">© 2026 {siteContent.domain} · Release {releaseLabel} by Mono256</p>

          <nav aria-label="Footer social links" className="ml-auto">
            <ul className="flex items-center justify-end gap-1.5">
              {socialItems.map((item) => {
                const isExternal = item.href.startsWith("http");
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      aria-label={item.label}
                      className={cn(iconInteractiveClass, focusVisibleRingClass, "h-5 w-5 text-foreground/70 hover:text-primary")}
                    >
                      {item.label === "GitHub" ? <GitHubIcon className="h-3 w-3" /> : null}
                      {item.label === "LinkedIn" ? <LinkedInIcon className="h-3 w-3" /> : null}
                      {item.label === "Email" ? <EmailIcon className="h-3 w-3" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </PageContainer>
    </footer>
  );
}
