"use client";

import { FormEvent, useRef, useState } from "react";

import { ExternalLink } from "@/components/shared/primitives/external-link";
import { siteContent } from "@/content/site";
import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/shared/icons/social-icons";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import {
  windowBodyResetClass,
  windowScrollContainerClass,
} from "@/components/shared/window/foundation";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/components/shared/integrations/turnstile-widget";
import { useSystemToast } from "@/components/shared/system/system-toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactRequest } from "@/lib/api/contact";
import { ApiError } from "@/lib/api/client";
import { getPublicTurnstileSiteKey, isTurnstileEnabled } from "@/lib/env";
import type { SystemToastTone } from "@/components/shared/system/system-toast-provider";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type InlineSubmissionFeedback = {
  message: string;
} | null;

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

function extractApiErrorMessage(error: ApiError): string | null {
  const { details } = error;

  if (typeof details === "string") {
    return details;
  }

  if (details && typeof details === "object") {
    if ("message" in details && typeof details.message === "string") {
      return details.message;
    }

    if ("detail" in details && typeof details.detail === "string") {
      return details.detail;
    }
  }

  return null;
}

function isCaptchaRelatedError(error: ApiError): boolean {
  const apiMessage = extractApiErrorMessage(error)?.toLowerCase();

  if (!apiMessage) {
    return false;
  }

  return (
    apiMessage.includes("captcha") ||
    apiMessage.includes("turnstile") ||
    apiMessage.includes("token")
  );
}

function buildContactErrorState(
  error: unknown,
  turnstileEnabled: boolean,
  hadCaptchaToken: boolean
): {
  surface: "inline" | "toast";
  toastDedupeKey?: string;
  toastTone?: SystemToastTone;
  toastTitle?: string;
  toastPersist?: boolean;
  message: string;
  shouldResetTurnstile: boolean;
} {
  if (error instanceof ApiError) {
    if (error.status === 400) {
      if (!hadCaptchaToken && turnstileEnabled) {
        return {
          surface: "inline",
          message:
            "Please complete the security check before sending your message.",
          shouldResetTurnstile: false,
        };
      }

      if (turnstileEnabled && isCaptchaRelatedError(error)) {
        return {
          surface: "inline",
          message:
            "The security check expired or could not be verified. Please complete it again and resubmit.",
          shouldResetTurnstile: true,
        };
      }

      return {
        surface: "inline",
        message: "Please review the form fields and try again.",
        shouldResetTurnstile: false,
      };
    }

    if (error.status === 429) {
      return {
        surface: "toast",
        toastDedupeKey: "contact-rate-limit",
        toastTone: "warning",
        toastTitle: "Rate limit reached",
        message:
          "Too many contact attempts were received. Please wait a moment and try again.",
        shouldResetTurnstile: false,
      };
    }

    if (error.status === 503) {
      return {
        surface: "toast",
        toastDedupeKey: "contact-service-unavailable",
        toastTone: "error",
        toastTitle: "Contact service unavailable",
        toastPersist: true,
        message:
          "The contact service is temporarily unavailable. Please try again shortly.",
        shouldResetTurnstile: false,
      };
    }
  }

  return {
    surface: "toast",
    toastDedupeKey: "contact-delivery-failed",
    toastTone: "error",
    toastTitle: "Message delivery failed",
    toastPersist: true,
    message: "The message could not be sent right now. Please try again.",
    shouldResetTurnstile: false,
  };
}

export function ContactPage() {
  const turnstileEnabled = isTurnstileEnabled();
  const turnstileSiteKey = turnstileEnabled
    ? getPublicTurnstileSiteKey()
    : null;
  const { showToast } = useSystemToast();
  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null);
  const [formState, setFormState] =
    useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<InlineSubmissionFeedback>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    if (turnstileEnabled && !captchaToken) {
      setFeedback({
        message:
          "Please complete the security check before sending your message.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitContactRequest({
        name: formState.name.trim(),
        email: formState.email.trim(),
        subject: formState.subject.trim(),
        message: formState.message.trim(),
        website: formState.website,
        ...(captchaToken ? { captchaToken } : {}),
      });

      setFormState(initialFormState);
      setCaptchaToken(null);
      turnstileRef.current?.reset();
      showToast({
        dedupeKey: "contact-submit-success",
        tone: "success",
        title: "Message sent",
        message: response.message,
      });
    } catch (error) {
      const errorState = buildContactErrorState(
        error,
        turnstileEnabled,
        Boolean(captchaToken)
      );

      if (errorState.shouldResetTurnstile) {
        setCaptchaToken(null);
        turnstileRef.current?.reset();
      }

      if (errorState.surface === "toast") {
        showToast({
          dedupeKey: errorState.toastDedupeKey,
          tone: errorState.toastTone ?? "error",
          title: errorState.toastTitle,
          message: errorState.message,
          persist: errorState.toastPersist,
        });
        setFeedback(null);
      } else {
        setFeedback({
          message: errorState.message,
        });
      }
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
          "Use direct email for immediate outreach.",
        ],
      }}
    >
      <section
        className={`min-h-0 flex-1 bg-[linear-gradient(180deg,#2e4f7f_0%,#2e4f7f_15%,#5f80ab_15%,#5f80ab_100%)] p-4 md:p-6 lg:p-4 ${windowScrollContainerClass}`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-3 md:gap-4 lg:gap-2.5">
          <header className="overflow-hidden rounded-xl border border-border/90 bg-surface shadow-card">
            <div className="h-1 w-full bg-brand/85" aria-hidden />
            <div className="p-4 md:p-5 lg:p-4">
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Reach me directly
              </h2>
              <p className="mt-1.5 text-sm text-foreground/75">
                Available for consulting in backend systems, architecture, and
                product engineering.
              </p>

              <ul className="mt-3 grid grid-cols-1 gap-y-2 text-sm text-foreground/80 sm:grid-cols-3 sm:gap-x-4 lg:mt-2.5">
                <li className="inline-flex items-center justify-center gap-2">
                  <EmailIcon className="h-4 w-4 shrink-0" />
                  <ExternalLink
                    href={`mailto:${siteContent.contactEmail}`}
                    className="font-medium text-foreground/85 hover:text-foreground"
                  >
                    {siteContent.contactEmail}
                  </ExternalLink>
                </li>
                <li className="inline-flex items-center justify-center gap-2">
                  <LinkedInIcon className="h-4 w-4 shrink-0" />
                  <ExternalLink
                    href={siteContent.linkedin}
                    className="font-medium text-foreground/85 hover:text-foreground"
                  >
                    gastongonzalez256
                  </ExternalLink>
                </li>
                <li className="inline-flex items-center justify-center gap-2">
                  <GitHubIcon className="h-4 w-4 shrink-0" />
                  <ExternalLink
                    href={siteContent.github}
                    className="font-medium text-foreground/85 hover:text-foreground"
                  >
                    gastong256
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </header>

          <form
            className="flex min-h-0 flex-1 flex-col rounded-xl border border-border/90 bg-surface p-4 shadow-card md:p-5 lg:p-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                Contact form
              </h3>
              <p className="mt-1 text-sm text-foreground/72">
                Project context, constraints, and timing help me respond faster.
              </p>
            </div>

            <div className="flex-1 space-y-2.5 lg:space-y-2">
              <div className="grid gap-3 md:grid-cols-2 lg:gap-2.5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    minLength={2}
                    maxLength={120}
                    required
                    className="lg:h-10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="you@example.com"
                    maxLength={320}
                    required
                    className="lg:h-10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                  placeholder="Backend architecture consulting"
                  minLength={2}
                  maxLength={140}
                  required
                  className="lg:h-10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground/88 lg:mb-1.5"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
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
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      website: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-3 lg:mt-2.5 lg:flex-row lg:items-end lg:justify-between">
              <div aria-live="polite" className="min-h-6 flex-1">
                {feedback ? (
                  <p className="text-sm font-medium text-[#f0c674]">
                    {feedback.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2 lg:items-end">
                {turnstileEnabled && turnstileSiteKey ? (
                  <div className="flex flex-col gap-2 self-start lg:self-auto">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                      <div className="flex flex-col gap-0.5 self-start lg:w-fit">
                        <TurnstileWidget
                          ref={turnstileRef}
                          siteKey={turnstileSiteKey}
                          size="flexible"
                          className="w-full"
                          onVerify={(token) => {
                            setCaptchaToken(token);
                            setFeedback(null);
                          }}
                          onExpire={() => {
                            setCaptchaToken(null);
                            setFeedback({
                              message:
                                "The security check expired. Please complete it again before sending your message.",
                            });
                          }}
                          onError={() => {
                            setCaptchaToken(null);
                            showToast({
                              dedupeKey: "turnstile-unavailable",
                              tone: "error",
                              title: "Security check unavailable",
                              message:
                                "The security check could not be loaded. Refresh the page and try again.",
                              persist: true,
                            });
                          }}
                        />

                        <p className="-mt-0.5 whitespace-nowrap text-xs text-foreground/60">
                          Complete the security check and then send your
                          message.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full lg:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send message"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full lg:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </WindowPageShell>
  );
}
