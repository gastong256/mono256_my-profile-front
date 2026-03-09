import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectsPage } from "@/components/pages/projects-page";
import { projectsContent } from "@/content/projects";
import { createPageMetadata } from "@/lib/metadata";

type ProjectRoutePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projectsContent.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectRoutePageProps): Metadata {
  const project = projectsContent.find((item) => item.slug === params.slug);

  if (!project) {
    return createPageMetadata({
      title: "Projects",
      description: "Project directory and engineering work overview.",
      path: "/projects"
    });
  }

  return createPageMetadata({
    title: `${project.name} | Projects`,
    description: project.summary,
    path: `/projects/${project.slug}`
  });
}

export default function ProjectRoutePage({ params }: ProjectRoutePageProps) {
  const project = projectsContent.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectsPage selectedSlug={project.slug} />;
}
