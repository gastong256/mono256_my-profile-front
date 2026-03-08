import Link from "next/link";

import { projectsContent } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

import { PageContainer } from "@/components/layout/page-container";

export function ProjectsPage() {
  return (
    <PageContainer className="py-14 md:py-20">
      <SectionTitle
        overline="Projects"
        title="Selected Projects"
        description="A curated list of product and engineering work across architecture, delivery, and developer tooling."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projectsContent.map((project) => (
          <Card key={project.slug} className="flex h-full flex-col">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="mt-3 flex-1 text-sm text-foreground/75">{project.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={`${project.slug}-${tech}`}>{tech}</Badge>
              ))}
            </div>

            <div className="mt-5 flex gap-4 text-sm font-semibold">
              <Link href={project.repositoryUrl} target="_blank" rel="noreferrer">
                Repository
              </Link>
              {project.demoUrl ? (
                <Link href={project.demoUrl} target="_blank" rel="noreferrer">
                  Live Demo
                </Link>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
