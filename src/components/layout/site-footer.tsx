import { ExternalLink } from "@/components/shared/primitives/external-link";
import { siteContent } from "@/content/site";
import {
  focusVisibleRingClass,
  iconInteractiveClass,
} from "@/components/ui/foundation";
import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/shared/icons/social-icons";
import { appVersion } from "@/lib/release";
import { cn } from "@/lib/utils/cn";

import { PageContainer } from "./page-container";

type SocialItem = {
  label: "Email" | "GitHub" | "LinkedIn";
  href: string;
};

const releaseLabel = `v${appVersion}`;

const socialItems: SocialItem[] = [
  { label: "Email", href: `mailto:${siteContent.contactEmail}` },
  ...siteContent.social
    .filter(
      (item): item is { label: "GitHub" | "LinkedIn"; href: string } =>
        item.label === "GitHub" || item.label === "LinkedIn"
    )
    .map((item) => ({ label: item.label, href: item.href })),
];

export function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-interactive-border/70 bg-background/45">
      <PageContainer className="py-1">
        <div className="flex items-center justify-between gap-3 text-[10px] text-foreground/55 md:text-[11px]">
          <p className="whitespace-nowrap font-mono lg:hidden">
            © 2026 {siteContent.domain}
          </p>
          <p className="hidden whitespace-nowrap font-mono lg:block">
            © 2026 {siteContent.domain} · Release {releaseLabel} by Mono256
          </p>

          <nav aria-label="Footer social links" className="ml-auto">
            <ul className="flex items-center justify-end gap-1.5">
              {socialItems.map((item) => (
                <li key={item.label}>
                  <ExternalLink
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      iconInteractiveClass,
                      focusVisibleRingClass,
                      "h-5 w-5 text-foreground/70 hover:text-primary"
                    )}
                  >
                    {item.label === "GitHub" ? (
                      <GitHubIcon className="h-3 w-3" />
                    ) : null}
                    {item.label === "LinkedIn" ? (
                      <LinkedInIcon className="h-3 w-3" />
                    ) : null}
                    {item.label === "Email" ? (
                      <EmailIcon className="h-3 w-3" />
                    ) : null}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </PageContainer>
    </footer>
  );
}
