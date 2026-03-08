import type { ProjectItem } from "@/types/content";

export const projectsContent: ProjectItem[] = [
  {
    slug: "profile-generator-core",
    name: "Profile Generator Core",
    summary:
      "Core engine that converts developer metadata into production-ready personal website pages.",
    tech: ["TypeScript", "Node.js", "Schema Design"],
    repositoryUrl: "https://github.com/mono256/profile-generator-core",
    featured: true
  },
  {
    slug: "portfolio-frontend",
    name: "Portfolio Frontend",
    summary:
      "Fast and maintainable marketing frontend built with static-first architecture and clear content boundaries.",
    tech: ["Next.js", "TailwindCSS", "Vercel"],
    repositoryUrl: "https://github.com/mono256/portfolio-frontend",
    demoUrl: "https://mono256.dev",
    featured: true
  },
  {
    slug: "developer-insights",
    name: "Developer Insights",
    summary:
      "Data workflow for extracting meaningful project signals from repositories and profile activity.",
    tech: ["APIs", "Data Pipelines", "Observability"],
    repositoryUrl: "https://github.com/mono256/developer-insights",
    featured: false
  }
];
