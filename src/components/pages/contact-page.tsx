"use client";

import { FormEvent, useState } from "react";

import { ExternalLink } from "@/components/shared/primitives/external-link";
import { siteContent } from "@/content/site";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/shared/icons/social-icons";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import { windowBodyResetClass, windowScrollContainerClass } from "@/components/shared/window/foundation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactRequest } from "@/lib/api/contact";
import { ApiError } from "@/lib/api/client";
import { getOptionalContactCaptchaToken } from "@/lib/contact/captcha";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type SubmissionFeedback =
  | {
      tone: "success";
      message: string;
    }
  | {
      tone: "error";
      message: string;
    }
  | null;

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: ""
};

function buildContactErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 400) {
      return "Please review the form fields and try again.";
    }

    if (error.status === 429) {
      return "Too many contact attempts were received. Please wait a moment and try again.";
    }

    if (error.status === 503) {
      return "The contact service is temporarily unavailable. Please try again shortly.";
    }
  }

  return "The message could not be sent right now. Please try again.";
}

export function ContactPage() {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<SubmissionFeedback>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const captchaToken = await getOptionalContactCaptchaToken();

    try {
      const response = await submitContactRequest({
        name: formState.name.trim(),
        email: formState.email.trim(),
        subject: formState.subject.trim(),
        message: formState.message.trim(),
        website: formState.website,
        ...(captchaToken ? { captchaToken } : {})
      });

      setFormState(initialFormState);
      setFeedback({
        tone: "success",
        message: response.message
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message: buildContactErrorMessage(error)
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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

          <form className="flex min-h-0 flex-1 flex-col rounded-xl border border-border/90 bg-surface p-4 shadow-card md:p-5 lg:p-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">Contact form</h3>
              <p className="mt-1 text-sm text-foreground/72">Project context, constraints, and timing help me respond faster.</p>
            </div>

            <div className="flex-1 space-y-2.5 lg:space-y-2">
              <div className="grid gap-3 md:grid-cols-2 lg:gap-2.5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Your name"
                    minLength={2}
                    maxLength={120}
                    required
                    className="lg:h-10"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                    placeholder="you@example.com"
                    maxLength={320}
                    required
                    className="lg:h-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={(event) => setFormState((current) => ({ ...current, subject: event.target.value }))}
                  placeholder="Backend architecture consulting"
                  minLength={2}
                  maxLength={140}
                  required
                  className="lg:h-10"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                  placeholder="Share your context, constraints, goals, and expected timeline."
                  minLength={1}
                  maxLength={2000}
                  required
                  className="lg:min-h-24"
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <Input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.website}
                  onChange={(event) => setFormState((current) => ({ ...current, website: event.target.value }))}
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between lg:mt-2.5">
              <div aria-live="polite" className="min-h-6">
                {feedback ? (
                  <p
                    className={
                      feedback.tone === "success"
                        ? "text-sm font-medium text-success"
                        : "text-sm font-medium text-[#f0c674]"
                    }
                  >
                    {feedback.message}
                  </p>
                ) : null}
              </div>

              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </WindowPageShell>
  );
}
