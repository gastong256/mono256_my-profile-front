import { cn } from "@/lib/utils/cn";

type SocialIconProps = {
  className?: string;
};

export function GitHubIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.8.5 12.35c0 5.24 3.3 9.68 7.88 11.25.58.11.79-.26.79-.58 0-.29-.01-1.05-.02-2.06-3.2.71-3.88-1.58-3.88-1.58-.52-1.37-1.28-1.73-1.28-1.73-1.05-.74.08-.72.08-.72 1.16.08 1.77 1.22 1.77 1.22 1.03 1.82 2.71 1.3 3.37.99.1-.77.4-1.3.72-1.6-2.56-.3-5.25-1.31-5.25-5.85 0-1.29.45-2.34 1.2-3.16-.12-.3-.52-1.5.11-3.13 0 0 .97-.32 3.19 1.21a10.7 10.7 0 0 1 5.8 0c2.22-1.53 3.19-1.21 3.19-1.21.63 1.63.23 2.83.11 3.13.75.82 1.2 1.87 1.2 3.16 0 4.55-2.69 5.54-5.26 5.84.41.37.77 1.11.77 2.24 0 1.62-.01 2.93-.01 3.33 0 .32.21.7.8.58A11.88 11.88 0 0 0 23.5 12.35C23.5 5.8 18.35.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.26 8.25h4.47V24H.26V8.25ZM8.23 8.25h4.28v2.15h.06c.6-1.13 2.05-2.32 4.22-2.32 4.52 0 5.35 2.98 5.35 6.86V24h-4.46v-7.95c0-1.9-.04-4.34-2.64-4.34-2.64 0-3.04 2.06-3.04 4.2V24H8.23V8.25Z" />
    </svg>
  );
}

export function EmailIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M2 5.5h20A1.5 1.5 0 0 1 23.5 7v10A1.5 1.5 0 0 1 22 18.5H2A1.5 1.5 0 0 1 .5 17V7A1.5 1.5 0 0 1 2 5.5Zm0 1 10 7 10-7H2Zm20 11v-9.77l-9.43 6.6a1 1 0 0 1-1.14 0L2 7.73v9.77h20Z" />
    </svg>
  );
}
