import { siteContent } from "@/content/site";
import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/section-title";
import { Textarea } from "@/components/ui/textarea";

import { PageContainer } from "@/components/layout/page-container";

export function ContactPage() {
  return (
    <PageContainer className="py-14 md:py-20">
      <SectionTitle
        overline="Contact"
        title="Let’s build something meaningful"
        description="Use the form to start a conversation. This is a UI placeholder for the upcoming backend integration."
      />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <form className="space-y-4 rounded-lg border border-border bg-surface p-6 shadow-card">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Message
            </label>
            <Textarea id="message" name="message" placeholder="What do you want to build?" required />
          </div>

          <Button type="submit" className="w-full">
            Send message
          </Button>
        </form>

        <div className="rounded-lg border border-border bg-surface p-6 shadow-card">
          <h3 className="text-lg font-semibold">Direct contact</h3>
          <p className="mt-3 text-sm text-foreground/75">
            For partnerships, consulting, or product collaboration, reach out directly.
          </p>
          <p className="mt-4 text-sm font-semibold">{siteContent.contactEmail}</p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
