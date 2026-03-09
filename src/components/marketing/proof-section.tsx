import { profileContent } from "@/content/profile";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { WindowFrame } from "@/components/ui/window-frame";

import { PageContainer } from "@/components/layout/page-container";

export function ProofSection() {
  return (
    <section className="mt-12 md:mt-16">
      <PageContainer>
        <WindowFrame title="About Snapshot" subtitle="/about">
          <SectionTitle
            overline="About"
            title="What I build"
            description="A clear engineering focus on maintainable products, developer productivity, and reliable delivery."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {profileContent.highlights.map((item) => (
              <Card key={item.title}>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-foreground/75">{item.description}</p>
              </Card>
            ))}
          </div>
        </WindowFrame>
      </PageContainer>
    </section>
  );
}
