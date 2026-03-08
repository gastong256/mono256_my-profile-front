import Link from "next/link";

import { projectsContent } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

import { PageContainer } from "@/components/layout/page-container";

export function FeaturedProjects() {
  const featured = projectsContent.filter((project) => project.featured);

  return (
    <section className="mt-16 md:mt-24">
      <PageContainer>
        <SectionTitle
          overline="Projects"
          title="Featured work"
          description="Selected projects that show architecture quality, delivery focus, and product thinking."
          actions={
            <Link href="/projects" className="text-sm font-semibold">
              View all projects
            </Link>
          }
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <Card key={project.slug}>
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="mt-3 text-sm text-foreground/75">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
