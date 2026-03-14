import type { ProjectItem } from "@/types/content";

export const projectsContent: ProjectItem[] = [
  {
    slug: "fastapi-production-template",
    name: "FastAPI Production Template",
    status: {
      label: "Production-ready",
      tone: "production",
    },
    summary:
      "Production-grade FastAPI template built as a golden path for backend services, including authentication scaffolding, PostgreSQL persistence, structured logging, rate limiting, and observability.",
    overview:
      "Production-ready FastAPI template built as a golden path for backend services. It provides a solid starting point for new APIs with authentication scaffolding, PostgreSQL persistence, structured logging, rate limiting, and observability already integrated. It standardizes backend architecture and reduces setup time while maintaining security, scalability, and operational best practices from day one. The goal is to eliminate repetitive setup work and allow new backend services to start with a consistent, secure, and scalable architecture.",
    highlights: [
      "Modular FastAPI architecture designed for real production services.",
      "Async PostgreSQL persistence with SQLAlchemy and Alembic migrations.",
      "JWT authentication scaffolding with OAuth2 token flow.",
      "Structured logging with request and tenant context propagation.",
      "Built-in rate limiting and security middleware.",
      "Observability with Prometheus metrics and optional OpenTelemetry.",
      "Designed as a reusable production template for backend APIs.",
    ],
    stackGroups: [
      {
        label: "Stack",
        items: [
          "FastAPI",
          "Python",
          "SQLAlchemy",
          "Alembic",
          "PostgreSQL",
          "Redis",
          "Docker",
          "Structlog",
          "Prometheus",
          "OpenTelemetry",
          "Pytest",
          "Pyright",
          "Ruff",
          "GitHub Actions",
        ],
      },
    ],
    lastUpdated: "Mar 2026",
    tech: ["FastAPI", "PostgreSQL", "Docker", "OpenTelemetry"],
    repositories: {
      backend: "https://github.com/gastong256/fastapi-base-template",
    },
    featured: true,
  },
  {
    slug: "accounting-system-asienta",
    name: "ASIENTA — SIC",
    status: {
      label: "Featured",
      tone: "featured",
    },
    detailTitle: "ASIENTA — Accounting Information System",
    summary:
      "Full-stack educational accounting web app. Students practice double-entry bookkeeping by managing companies and recording journal entries in real time.",
    overview:
      "Full-stack web application for high school accounting students. Each student manages simulated companies and practices double-entry bookkeeping through a real accounting engine. Built on a custom Django golden path template (django-drf-base-template) developed to standardize project structure and production conventions across REST API projects.\n\nThe backend exposes a versioned REST API with JWT authentication, role-based permissions, and a hierarchical chart of accounts modeled after the Argentine SIC 1 (Angrisani) textbook. The frontend is a React SPA with a fully mocked demo mode — no backend needed to explore the app — and connects seamlessly to the real API when deployed in production.",
    highlights: [
      "Real double-entry accounting enforced by django-hordak — debit/credit balance validated before every journal entry is persisted.",
      "Role-based access control (student / teacher / admin) with company ownership and course enrollment scoping.",
      "Fully functional frontend demo deployed on Vercel — runs against MSW mocks with no backend required.",
      "Production-ready backend: structured logs, health checks, OpenTelemetry, automated releases via semantic-release.",
    ],
    stackGroups: [
      {
        label: "Backend",
        items: [
          "Django",
          "DRF",
          "PostgreSQL",
          "django-hordak",
          "JWT",
          "Docker",
          "Pytest",
        ],
      },
      {
        label: "Frontend",
        items: [
          "React 19",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Zustand",
          "TanStack Query",
          "Zod",
          "MSW",
          "Playwright",
        ],
      },
    ],
    lastUpdated: "Mar 2026",
    tech: ["Django", "PostgreSQL", "React", "TypeScript"],
    repositories: {
      backend: "https://github.com/gastong256/mono256_sic-core",
      frontend: "https://github.com/gastong256/mono256_sic_web",
    },
    demoUrl: "https://mono256-sic-web.vercel.app/",
    featured: true,
  },
  {
    slug: "my-profile-generator",
    name: "Developer Site Generator",
    summary:
      "A developer site generator that connects GitHub and Vercel to create and deploy a production-ready personal site in a simple flow. Status: In progress.",

    overview:
      "Started as a production-ready personal website and is evolving into a developer tool that generates structured engineering sites from GitHub repositories and deploys them through Vercel.",

    highlights: [
      "Product direction focused on fast setup, clean defaults, and minimal configuration.",
      "Architecture designed to evolve from a single site into a reusable generation platform.",
      "Current phase focused on implementing the core onboarding flow and platform integrations.",
    ],

    lastUpdated: "Mar 2026",
    tech: ["Next.js", "Fastify", "BullMQ", "PostgreSQL", "Redis"],
    repositories: {
      frontend: "https://github.com/gastong256/mono256_my-profile-front",
    },
    featured: true,
  },
];
