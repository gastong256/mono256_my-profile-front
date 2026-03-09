import type { ProjectItem } from "@/types/content";

export const projectsContent: ProjectItem[] = [
  {
    slug: "fastapi-production-template",
    name: "FastAPI Production Template",
    summary:
      "Production-ready FastAPI template with a clean baseline for shipping backend services on a reliable path. Status: Completed.",
    overview:
      "A backend starter focused on production quality from day one, including structure, defaults, and tooling for maintainable API delivery.",
    highlights: [
      "Structured project foundation for maintainable service growth.",
      "Backend-first setup with pragmatic conventions for teams.",
      "Golden-path baseline to reduce setup noise and accelerate delivery."
    ],
    lastUpdated: "Mar 2026",
    tech: ["FastAPI", "PostgreSQL"],
    repositoryUrl: "https://github.com/gastong256/fastapi-base-template",
    featured: true
  },
  {
    slug: "accounting-system-asienta",
    name: "Accounting System (Asienta)",
    summary:
      "Educational accounting system simulator built to help users understand accounting flows and core concepts through software. Status: Demo.",
    overview:
      "A demo-focused learning platform that models accounting workflows in a practical interface for educational environments.",
    highlights: [
      "Flow-oriented learning experience for accounting fundamentals.",
      "Core repository: github.com/gastong256/mono256_sic-core",
      "Web repository: github.com/gastong256/mono256_sic_web"
    ],
    lastUpdated: "Mar 2026",
    tech: ["Django"],
    repositoryUrl: "https://github.com/gastong256/mono256_sic_web",
    demoUrl: "https://mono256-sic-web.vercel.app/",
    featured: true
  },
  {
    slug: "my-profile-generator",
    name: "my-profile / website generator",
    summary:
      "A personal website baseline evolving into a generator for developers to create and deploy a professional portfolio in a simple flow. Status: In progress.",
    overview:
      "This project starts as a production-ready personal website and evolves into a product that generates a portfolio from GitHub and deploys it through Vercel.",
    highlights: [
      "Product direction centered on speed, usability, and clean technical defaults.",
      "Architecture designed for incremental evolution from portfolio to generator.",
      "Current phase focused on implementing the core user flow and integration model."
    ],
    lastUpdated: "Mar 2026",
    tech: ["Next.js", "Fastify", "BullMQ", "PostgreSQL", "Redis"],
    repositoryUrl: "https://github.com/gastong256/mono256_my-profile-front",
    featured: true
  }
];
