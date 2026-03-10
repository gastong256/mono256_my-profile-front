import Link from "next/link";

import { GitHubIcon } from "@/components/shared/icons/social-icons";
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
import { buttonVariants } from "@/components/ui/button";

type ProjectsPageProps = {
  selectedSlug?: string;
};
type ProjectStatusTone = NonNullable<ProjectItem["status"]>["tone"];

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

      <div className="grid gap-4 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-2 lg:gap-3">
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
              {project.status ? (
                <Badge className={statusBadgeClass(project.status.tone)}>
                  {project.status.label}
                </Badge>
              ) : project.featured ? (
                <Badge className="shrink-0">Featured</Badge>
              ) : null}
            </div>

            <p className="mt-3 flex-1 break-words text-sm text-foreground/75 lg:mt-2.5 lg:text-[13px]">{project.summary}</p>
            <div className="mt-4 flex items-center justify-between gap-3 lg:mt-3">
              <p className="inline-flex items-center gap-1 font-mono text-[11px] text-brand">
                <span aria-hidden>›</span>
                <span>open</span>
              </p>
              <div className="flex items-center gap-1">
                {project.tech.slice(0, 4).map((tech) => (
                  <TechGlyph key={`${project.slug}-${tech}`} tech={tech} />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProjectOverview({ project }: { project: ProjectItem }) {
  const detailTitle = project.detailTitle ?? project.name;
  const overviewParagraphs = project.overview
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const showStackGroupLabel = (project.stackGroups?.length ?? 0) > 1;
  const actionLinks = buildProjectActions(project);

  return (
    <section className="flex min-h-0 flex-1 flex-col p-4 md:p-6 lg:p-4">
      <div className={`min-h-0 flex-1 ${windowScrollContainerClass}`}>
        <div className="flex min-w-0 flex-wrap items-center gap-2 font-mono text-[11px] text-foreground/65 md:text-xs">
          <Link href="/projects" className="text-foreground/75 hover:text-foreground">
            ~/Projects
          </Link>
          <span>/</span>
          <span className="break-all text-brand">{project.slug}</span>
        </div>

        <div className="px-2 md:px-4 lg:px-5">
          <div className="mt-4 flex min-w-0 items-center gap-2 lg:mt-3">
            <FolderIcon className="text-foreground/80" />
            <h2 className="break-words text-xl font-semibold text-foreground md:text-2xl">{detailTitle}</h2>
          </div>

          <div className="mt-3 space-y-2.5 lg:mt-2.5">
            {overviewParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-justify break-words text-sm text-foreground/80 md:text-base lg:text-[15px]">
                {paragraph}
              </p>
            ))}
          </div>

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

          {project.stackGroups?.length ? (
            <div className="mt-6 space-y-3 lg:mt-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60 md:text-xs">Stack</p>
              {project.stackGroups.map((group) => (
                <div key={`${project.slug}-${group.label}`} className="flex flex-wrap items-start gap-2">
                  {showStackGroupLabel ? (
                    <p className="min-w-20 pt-0.5 text-xs font-semibold uppercase tracking-wide text-foreground/70">{group.label}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={`${project.slug}-${group.label}-${item}`}>{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-3 border-t border-border/70 pt-4 lg:pt-3.5">
        <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
          <div className="flex w-full flex-col items-start gap-2 lg:w-auto lg:flex-row lg:flex-wrap">
            {actionLinks.map((action) => (
              <ExternalLink
                key={`${project.slug}-${action.label}`}
                href={action.href}
                aria-label={`${action.label} (opens in new tab)`}
                className={`${buttonVariants({ variant: action.variant, size: "md" })} w-full justify-start gap-2 md:w-full lg:w-40 lg:justify-center`}
              >
                {action.kind === "demo" ? (
                  <LaunchIcon className="h-3.5 w-3.5" />
                ) : (
                  <GitHubIcon className="h-3.5 w-3.5" />
                )}
                <span>{action.label}</span>
                <span aria-hidden className="text-xs">
                  ↗
                </span>
                <span className="sr-only">opens in new tab</span>
              </ExternalLink>
            ))}
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/78 hover:text-foreground lg:ml-auto lg:shrink-0"
          >
            <BackIcon className="h-3.5 w-3.5" />
            Back to directory
          </Link>
        </div>
      </div>
    </section>
  );
}

function TechGlyph({ tech }: { tech: string }) {
  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded border border-border/80 bg-background/40 text-foreground/75"
      title={tech}
      aria-label={tech}
    >
      <TechIcon tech={tech} />
    </span>
  );
}

function statusBadgeClass(tone?: ProjectStatusTone) {
  if (tone === "production") {
    return "shrink-0 border-success/45 bg-success-subtle/75 text-success";
  }

  if (tone === "neutral") {
    return "shrink-0 border-foreground/25 bg-foreground/10 text-foreground/80";
  }

  return "shrink-0";
}

type ProjectAction = {
  label: string;
  href: string;
  kind: "demo" | "backend" | "frontend" | "repository";
  variant: "primary" | "secondary";
};

function buildProjectActions(project: ProjectItem): ProjectAction[] {
  const actions: Omit<ProjectAction, "variant">[] = [];

  if (project.demoUrl) {
    actions.push({
      label: "Live Demo",
      href: project.demoUrl,
      kind: "demo"
    });
  }

  if (project.repositories?.backend) {
    actions.push({
      label: "Backend",
      href: project.repositories.backend,
      kind: "backend"
    });
  }

  if (project.repositories?.frontend) {
    actions.push({
      label: "Frontend",
      href: project.repositories.frontend,
      kind: "frontend"
    });
  }

  if (!project.repositories?.backend && !project.repositories?.frontend && project.repositoryUrl) {
    actions.push({
      label: "Repository",
      href: project.repositoryUrl,
      kind: "repository"
    });
  }

  const hasDemo = actions.some((action) => action.kind === "demo");

  return actions.map((action, index) => ({
    ...action,
    variant: action.kind === "demo" || (!hasDemo && index === 0) ? "primary" : "secondary"
  }));
}

function LaunchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 13v5a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path d="M15 6 9 12l6 6" />
    </svg>
  );
}
