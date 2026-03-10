import Link from "next/link";

import { projectsContent } from "@/content/projects";
import type { ProjectItem } from "@/types/content";
import { WindowPageShell } from "@/components/layout/window-page-shell";
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
        windowBodyClassName="!p-0 md:!p-0 flex min-h-0 flex-1 flex-col !overflow-hidden"
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
          <p className="whitespace-nowrap font-mono text-[11px] text-foreground/70 md:text-xs">
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
    <section className="min-h-0 flex-1 p-4 md:overflow-y-auto md:p-6 lg:p-4">
      <div className="mb-4 flex items-center gap-2 font-mono text-[11px] text-foreground/65 md:text-xs lg:mb-3">
        <span className="text-foreground/75">~/Projects</span>
      </div>

      <div className="grid gap-4 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 lg:gap-3">
        {projectsContent.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex h-full flex-col rounded-lg border border-border/80 bg-surface/75 p-5 transition-colors hover:border-brand/40 hover:bg-surface lg:p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <FolderIcon className="text-foreground/75 group-hover:text-foreground" />
                <p className="truncate text-sm font-semibold text-foreground">{project.name}/</p>
              </div>
              {project.featured ? <Badge className="shrink-0">Featured</Badge> : null}
            </div>

            <p className="mt-3 flex-1 text-sm text-foreground/75 lg:mt-2.5 lg:text-[13px]">{project.summary}</p>
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
    <section className="min-h-0 flex-1 p-4 md:overflow-y-auto md:p-6 lg:p-4">
      <div className="flex items-center gap-2 font-mono text-[11px] text-foreground/65 md:text-xs">
        <Link href="/projects" className="text-foreground/75 hover:text-foreground">
          ~/Projects
        </Link>
        <span>/</span>
        <span className="text-brand">{project.slug}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 lg:mt-3">
        <FolderIcon className="text-foreground/80" />
        <h2 className="text-xl font-semibold text-foreground md:text-2xl">{project.name}</h2>
      </div>

      <p className="mt-3 max-w-3xl text-sm text-foreground/80 md:text-base lg:mt-2.5 lg:text-[15px]">{project.overview}</p>

      <div className="mt-6 lg:mt-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60 md:text-xs">Highlights</p>
        <ul className="mt-3 space-y-2 lg:mt-2.5 lg:space-y-1.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="text-sm text-foreground/80 md:text-[15px]">
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
        <Link href={project.repositoryUrl} target="_blank" rel="noreferrer">
          Open Repository
        </Link>
        {project.demoUrl ? (
          <Link href={project.demoUrl} target="_blank" rel="noreferrer">
            Open Demo
          </Link>
        ) : null}
        <Link href="/projects" className="text-foreground/80 hover:text-foreground">
          Back to directory
        </Link>
      </div>
    </section>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M3.5 7.5h6l1.7-2h9.3a1 1 0 0 1 1 1v10.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V7.5Z" />
      <path d="M3.5 9.5h18" />
    </svg>
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

function TechIcon({ tech }: { tech: string }) {
  if (tech === "TypeScript") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#3178C6" />
        <path d="M8.2 9.2h7.6v1.9h-2.8V17h-2v-5.9H8.2zm8.1 2.6c.2-1.1 1.1-1.8 2.5-1.8 1.2 0 2.2.5 2.7 1.5l-1.6.9c-.3-.5-.6-.7-1-.7-.4 0-.7.2-.7.5 0 .4.3.6 1.2.9 1.4.5 2.2 1.1 2.2 2.4 0 1.5-1.2 2.5-2.9 2.5-1.7 0-2.8-.8-3.3-2.1l1.6-.8c.3.6.7 1.1 1.6 1.1.6 0 .9-.2.9-.6 0-.4-.3-.6-1.3-.9-1.4-.5-2.2-1.1-2.2-2.4" fill="#fff" />
      </svg>
    );
  }

  if (tech === "Node.js") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <polygon points="12,2.5 20,7 20,17 12,21.5 4,17 4,7" fill="#3C873A" />
        <path d="M9 15V9h1.2l2.6 3.5V9H14v6h-1.1l-2.7-3.6V15z" fill="#fff" />
      </svg>
    );
  }

  if (tech === "Next.js") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <circle cx="12" cy="12" r="9" fill="#111" />
        <path d="M9 8.2v7.6h1.7v-4.2l3.3 4.2H16V8.2h-1.7v4.1l-3.2-4.1z" fill="#fff" />
      </svg>
    );
  }

  if (tech === "TailwindCSS") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path
          d="M12 7c-2.6 0-4.2 1.3-4.7 3.9.7-.9 1.4-1.2 2.3-1.1.5.1.9.4 1.3.7.7.6 1.5 1.2 3.3 1.2 2.6 0 4.2-1.3 4.7-3.9-.7.9-1.4 1.2-2.3 1.1-.5-.1-.9-.4-1.3-.7-.7-.6-1.5-1.2-3.3-1.2m-4.7 5.3C4.7 12.3 3 13.6 2.6 16.2c.7-.9 1.4-1.2 2.3-1.1.5.1.9.4 1.3.7.7.6 1.5 1.2 3.3 1.2 2.6 0 4.2-1.3 4.7-3.9-.7.9-1.4 1.2-2.3 1.1-.5-.1-.9-.4-1.3-.7-.7-.6-1.5-1.2-3.3-1.2"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  if (tech === "Vercel") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path d="M12 5 19 18H5z" fill="#fff" />
      </svg>
    );
  }

  if (tech === "APIs") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M7 8h10v8H7z" />
        <path d="M10 8V6m4 2V6m-4 10v2m4-2v2m3-7h2m-2 4h2M5 11H3m2 4H3" />
      </svg>
    );
  }

  if (tech === "Data Pipelines") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="5" cy="7" r="1.7" />
        <circle cx="12" cy="12" r="1.7" />
        <circle cx="19" cy="17" r="1.7" />
        <path d="M6.5 8.2 10.6 10.8m2.8 2.4 4 2.5" />
      </svg>
    );
  }

  if (tech === "Observability") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5z" />
        <circle cx="12" cy="12" r="2.4" />
      </svg>
    );
  }

  if (tech === "Schema Design") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3.5" y="4" width="7" height="5" rx="1" />
        <rect x="13.5" y="4" width="7" height="5" rx="1" />
        <rect x="8.5" y="15" width="7" height="5" rx="1" />
        <path d="M10.5 6.5h3m-1.5 2.5v4.2" />
      </svg>
    );
  }

  return <span className="font-mono text-[9px] uppercase text-foreground/70">{toFallbackCode(tech)}</span>;
}

function toFallbackCode(tech: string): string {
  const parts = tech
    .replace(/\./g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
