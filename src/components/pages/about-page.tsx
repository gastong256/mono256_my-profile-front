import { profileContent } from "@/content/profile";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

import { PageContainer } from "@/components/layout/page-container";

export function AboutPage() {
  return (
    <PageContainer className="py-14 md:py-20">
      <SectionTitle overline="About" title={profileContent.fullName} description={profileContent.summary} />

      <div className="mt-8 rounded-lg border border-border bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{profileContent.role}</Badge>
          <Badge>{profileContent.location}</Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {profileContent.highlights.map((highlight) => (
          <Card key={highlight.title}>
            <h3 className="text-lg font-semibold">{highlight.title}</h3>
            <p className="mt-3 text-sm text-foreground/75">{highlight.description}</p>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
