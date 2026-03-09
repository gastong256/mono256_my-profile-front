import Link from "next/link";

import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WindowFrame } from "@/components/ui/window-frame";

import { PageContainer } from "@/components/layout/page-container";

export function ContactPage() {
  return (
    <PageContainer className="flex h-full min-h-0 flex-col py-1 md:py-2">
      <WindowFrame
        title="Contact.form"
        size="fixed"
        className="w-full"
        bodyClassName="!p-0 md:!p-0 flex min-h-0 flex-1 flex-col !overflow-hidden"
        status="interactive"
        help={{
          section: "Contact",
          path: "~/Contact.form",
          items: [
            "Use the form fields to prepare your message.",
            "Use direct email for immediate outreach."
          ]
        }}
      >
        <section className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,#b26f3f_0%,#b26f3f_15%,#c9956f_15%,#c9956f_100%)] p-4 md:p-6">
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-4 md:gap-5">
            <header className="overflow-hidden rounded-xl border border-border/90 bg-surface shadow-card">
              <div className="h-1 w-full bg-brand/85" aria-hidden />
              <div className="p-4 md:p-5">
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Reach me directly</h2>
                <p className="mt-1.5 text-sm text-foreground/75">
                  Available for consulting in backend systems, architecture, and product engineering.
                </p>

                <ul className="mt-4 grid grid-cols-1 gap-y-2 text-sm text-foreground/80 sm:grid-cols-3 sm:gap-x-4">
                  <li className="inline-flex items-center justify-center gap-2">
                    <ChannelIcon type="email" />
                    <Link href={`mailto:${siteContent.contactEmail}`} className="font-medium text-foreground/85 hover:text-foreground">
                      {siteContent.contactEmail}
                    </Link>
                  </li>
                  <li className="inline-flex items-center justify-center gap-2">
                    <ChannelIcon type="linkedin" />
                    <Link href={siteContent.linkedin} target="_blank" rel="noreferrer" className="font-medium text-foreground/85 hover:text-foreground">
                      gastongonzalez256
                    </Link>
                  </li>
                  <li className="inline-flex items-center justify-center gap-2">
                    <ChannelIcon type="github" />
                    <Link href={siteContent.github} target="_blank" rel="noreferrer" className="font-medium text-foreground/85 hover:text-foreground">
                      gastong256
                    </Link>
                  </li>
                </ul>
              </div>
            </header>

            <form className="flex min-h-0 flex-1 flex-col rounded-xl border border-border/90 bg-surface p-4 shadow-card md:p-5">
              <div className="mb-4">
                <h3 className="text-lg font-semibold tracking-tight md:text-xl">Contact form</h3>
              </div>

              <div className="flex-1 space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground/88">
                      Name
                    </label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground/88">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground/88">
                    Subject
                  </label>
                  <Input id="subject" name="subject" placeholder="Backend architecture consulting" required />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground/88">
                    Message
                  </label>
                  <Textarea id="message" name="message" placeholder="Share your context, constraints, goals, and expected timeline." required />
                </div>
              </div>

              <div className="mt-4 flex md:justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  Send message
                </Button>
              </div>
            </form>
          </div>
        </section>
      </WindowFrame>
    </PageContainer>
  );
}

function ChannelIcon({ type }: { type: "email" | "linkedin" | "github" }) {
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
        <path d="M2 5.5h20A1.5 1.5 0 0 1 23.5 7v10A1.5 1.5 0 0 1 22 18.5H2A1.5 1.5 0 0 1 .5 17V7A1.5 1.5 0 0 1 2 5.5Zm0 1 10 7 10-7H2Zm20 11v-9.77l-9.43 6.6a1 1 0 0 1-1.14 0L2 7.73v9.77h20Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.26 8.25h4.47V24H.26V8.25ZM8.23 8.25h4.28v2.15h.06c.6-1.13 2.05-2.32 4.22-2.32 4.52 0 5.35 2.98 5.35 6.86V24h-4.46v-7.95c0-1.9-.04-4.34-2.64-4.34-2.64 0-3.04 2.06-3.04 4.2V24H8.23V8.25Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.8.5 12.35c0 5.24 3.3 9.68 7.88 11.25.58.11.79-.26.79-.58 0-.29-.01-1.05-.02-2.06-3.2.71-3.88-1.58-3.88-1.58-.52-1.37-1.28-1.73-1.28-1.73-1.05-.74.08-.72.08-.72 1.16.08 1.77 1.22 1.77 1.22 1.03 1.82 2.71 1.3 3.37.99.1-.77.4-1.3.72-1.6-2.56-.3-5.25-1.31-5.25-5.85 0-1.29.45-2.34 1.2-3.16-.12-.3-.52-1.5.11-3.13 0 0 .97-.32 3.19 1.21a10.7 10.7 0 0 1 5.8 0c2.22-1.53 3.19-1.21 3.19-1.21.63 1.63.23 2.83.11 3.13.75.82 1.2 1.87 1.2 3.16 0 4.55-2.69 5.54-5.26 5.84.41.37.77 1.11.77 2.24 0 1.62-.01 2.93-.01 3.33 0 .32.21.7.8.58A11.88 11.88 0 0 0 23.5 12.35C23.5 5.8 18.35.5 12 .5Z" />
    </svg>
  );
}
