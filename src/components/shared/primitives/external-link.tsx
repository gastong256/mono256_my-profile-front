import type { AnchorHTMLAttributes } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function ExternalLink({ target, rel, ...props }: ExternalLinkProps) {
  return (
    <a
      target={target ?? "_blank"}
      rel={rel ?? "noopener noreferrer"}
      {...props}
    />
  );
}
