import Link from "next/link";

import { ExternalLink } from "@/components/shared/primitives/external-link";
import { projectsContent } from "@/content/projects";
import type { ProjectItem } from "@/types/content";
import { FolderIcon, TechIcon } from "@/components/shared/icons/project-icons";
import {
  windowBodyResetClass,
  windowScrollContainerClass
} from "@/components/shared/window/foundation";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import { Badge } from "@/components/ui/badge";

type ProjectsPageProps = {
  selectedSlug?: string;
};

export function ProjectsPage({ selectedSlug }: ProjectsPageProps) {
  const selectedProject = selectedSlug
    ? projectsContent.find((project) => project.slug === selectedSlug) ?? null
    : null;

  const featuredCount = projectsContent.filter((project) => project.featured).length;
  const techTagsCount = new Set(projectsContent.flatMap((project) => project.tech)).size;

  const overviewPath = selectedProject ? `~/Projects/${selectedProject.slug}/` : "~/Projects/";

  return (
    <WindowPageShell
      title="Projects/"
      windowBodyClassName={windowBodyResetClass}
      status="external-links"
      help={{
        section: "Projects",
        path: overviewPath,
        items: selectedProject
          ? [
              "Review the selected project overview and technical highlights.",
              "Open repository or demo links in external tabs."
            ]
          : [
              "Open a project folder to view its overview.",
              "Browse all available projects as a directory."
            ]
      }}
    >
      {selectedProject ? <ProjectOverview project={selectedProject} /> : <ProjectsDirectory />}

      <div className="border-t border-border/70 bg-background/25 px-4 py-2 md:px-6 lg:px-5 lg:py-1.5">
        <p className="font-mono text-[11px] text-foreground/70 md:whitespace-nowrap md:text-xs">
          {selectedProject
            ? `Viewing: ${selectedProject.name}/`
            : `${projectsContent.length} folders · ${featuredCount} featured · ${techTagsCount} tech tags`}
        </p>
      </div>
    </WindowPageShell>
  );
}

function ProjectsDirectory() {
  return (
    <section className={`min-h-0 flex-1 p-4 md:p-6 lg:p-4 ${windowScrollContainerClass}`}>
      <div className="mb-4 flex items-center gap-2 font-mono text-[11px] text-foreground/65 md:text-xs lg:mb-3">
        <span className="text-foreground/75">~/Projects</span>
      </div>

      <div className="grid gap-4 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 lg:gap-3">
        {projectsContent.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex min-w-0 h-full flex-col rounded-lg border border-border/80 bg-surface/75 p-5 transition-colors hover:border-brand/40 hover:bg-surface lg:p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <FolderIcon className="text-foreground/75 group-hover:text-foreground" />
                <p className="truncate text-sm font-semibold text-foreground">{project.name}/</p>
              </div>
              {project.featured ? <Badge className="shrink-0">Featured</Badge> : null}
            </div>

            <p className="mt-3 flex-1 break-words text-sm text-foreground/75 lg:mt-2.5 lg:text-[13px]">{project.summary}</p>
            <div className="mt-4 flex items-center justify-between gap-3 lg:mt-3">
              <p className="font-mono text-[11px] text-brand">open</p>
              <div className="flex items-center gap-1">
                {project.tech.slice(0, 4).map((tech) => (
                  <TechGlyph key={`${project.slug}-${tech}`} tech={tech} />
                ))}
                {project.tech.length > 4 ? (
                  <span className="inline-flex h-5 items-center justify-center rounded border border-border/80 bg-background/40 px-1.5 font-mono text-[9px] text-foreground/70">
                    +{project.tech.length - 4}
                  </span>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProjectOverview({ project }: { project: ProjectItem }) {
  return (
    <section className={`min-h-0 flex-1 p-4 md:p-6 lg:p-4 ${windowScrollContainerClass}`}>
      <div className="flex min-w-0 flex-wrap items-center gap-2 font-mono text-[11px] text-foreground/65 md:text-xs">
        <Link href="/projects" className="text-foreground/75 hover:text-foreground">
          ~/Projects
        </Link>
        <span>/</span>
        <span className="break-all text-brand">{project.slug}</span>
      </div>

      <div className="mt-4 flex min-w-0 items-center gap-2 lg:mt-3">
        <FolderIcon className="text-foreground/80" />
        <h2 className="break-words text-xl font-semibold text-foreground md:text-2xl">{project.name}</h2>
      </div>

      <p className="mt-3 max-w-3xl break-words text-sm text-foreground/80 md:text-base lg:mt-2.5 lg:text-[15px]">{project.overview}</p>

      <div className="mt-6 lg:mt-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60 md:text-xs">Highlights</p>
        <ul className="mt-3 space-y-2 lg:mt-2.5 lg:space-y-1.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="break-words text-sm text-foreground/80 md:text-[15px]">
              <span className="mr-2 text-brand">•</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 lg:mt-4 lg:gap-1.5">
        {project.tech.map((tech) => (
          <Badge key={`${project.slug}-${tech}`}>{tech}</Badge>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-semibold lg:mt-5">
        <ExternalLink href={project.repositoryUrl}>
          Open Repository
        </ExternalLink>
        {project.demoUrl ? (
          <ExternalLink href={project.demoUrl}>
            Open Demo
          </ExternalLink>
        ) : null}
        <Link href="/projects" className="text-foreground/80 hover:text-foreground">
          Back to directory
        </Link>
      </div>
    </section>
  );
}

function TechGlyph({ tech }: { tech: string }) {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded border border-border/80 bg-background/40 text-foreground/75"
      title={tech}
      aria-label={tech}
    >
      <TechIcon tech={tech} />
    </span>
  );
}
