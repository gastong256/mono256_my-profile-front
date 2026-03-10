import { ExternalLink } from "@/components/shared/primitives/external-link";
import { siteContent } from "@/content/site";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/shared/icons/social-icons";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import { windowBodyResetClass, windowScrollContainerClass } from "@/components/shared/window/foundation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactPage() {
  return (
    <WindowPageShell
      title="Contact.form"
      windowBodyClassName={windowBodyResetClass}
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
      <section
        className={`min-h-0 flex-1 bg-[linear-gradient(180deg,#2e4f7f_0%,#2e4f7f_15%,#5f80ab_15%,#5f80ab_100%)] p-4 md:p-6 lg:p-4 ${windowScrollContainerClass}`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-3 md:gap-4 lg:gap-2.5">
          <header className="overflow-hidden rounded-xl border border-border/90 bg-surface shadow-card">
            <div className="h-1 w-full bg-brand/85" aria-hidden />
            <div className="p-4 md:p-5 lg:p-4">
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Reach me directly</h2>
              <p className="mt-1.5 text-sm text-foreground/75">
                Available for consulting in backend systems, architecture, and product engineering.
              </p>

              <ul className="mt-3 grid grid-cols-1 gap-y-2 text-sm text-foreground/80 sm:grid-cols-3 sm:gap-x-4 lg:mt-2.5">
                <li className="inline-flex items-center justify-center gap-2">
                  <EmailIcon className="h-4 w-4 shrink-0" />
                  <ExternalLink href={`mailto:${siteContent.contactEmail}`} className="font-medium text-foreground/85 hover:text-foreground">
                    {siteContent.contactEmail}
                  </ExternalLink>
                </li>
                <li className="inline-flex items-center justify-center gap-2">
                  <LinkedInIcon className="h-4 w-4 shrink-0" />
                  <ExternalLink href={siteContent.linkedin} className="font-medium text-foreground/85 hover:text-foreground">
                    gastongonzalez256
                  </ExternalLink>
                </li>
                <li className="inline-flex items-center justify-center gap-2">
                  <GitHubIcon className="h-4 w-4 shrink-0" />
                  <ExternalLink href={siteContent.github} className="font-medium text-foreground/85 hover:text-foreground">
                    gastong256
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </header>

          <form className="flex min-h-0 flex-1 flex-col rounded-xl border border-border/90 bg-surface p-4 shadow-card md:p-5 lg:p-4">
            <div className="mb-3">
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">Contact form</h3>
            </div>

            <div className="flex-1 space-y-2.5 lg:space-y-2">
              <div className="grid gap-3 md:grid-cols-2 lg:gap-2.5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required className="lg:h-10" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required className="lg:h-10" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5">
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="Backend architecture consulting" required className="lg:h-10" />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Share your context, constraints, goals, and expected timeline."
                  required
                  className="lg:min-h-24"
                />
              </div>
            </div>

            <div className="mt-3 flex md:justify-end lg:mt-2.5">
              <Button type="submit" className="w-full md:w-auto">
                Send message
              </Button>
            </div>
          </form>
        </div>
      </section>
    </WindowPageShell>
  );
}
