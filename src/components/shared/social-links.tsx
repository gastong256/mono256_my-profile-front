import Link from "next/link";

import { siteContent } from "@/content/site";
import { cn } from "@/lib/utils/cn";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-4", className)}>
      {siteContent.social.map((item) => (
        <li key={item.label}>
          <Link href={item.href} target="_blank" rel="noreferrer" className="text-sm font-medium">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
