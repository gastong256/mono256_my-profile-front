import type { ProfileContent } from "@/types/content";

export const profileContent: ProfileContent = {
  fullName: "Gastón Germán Gonzalez",
  role: "Software Engineer",
  location: "Remote worldwide - Based in Argentina",
  summary:
    "Senior software engineer with 7+ years of experience building backend systems, pragmatic architecture, and production-ready software.",
  highlights: [
    {
      title: "Backend Engineering",
      description:
        "Designing reliable backend services and APIs with Python-first delivery and clear operational standards."
    },
    {
      title: "Architecture Mindset",
      description:
        "Building maintainable systems with explicit tradeoffs, clear boundaries, and long-term scalability in mind."
    },
    {
      title: "Product + DevOps Culture",
      description:
        "Shipping with ownership across code quality, delivery flow, and operational reliability."
    }
  ],
  aboutDocument: {
    fileName: "Profile.md",
    language: "EN",
    lastUpdated: "Mar 2026",
    title: "Senior software engineer focused on backend systems, architecture, and production reliability",
    profileRole: "Senior Software Engineer",
    experienceSnapshot: {
      title: "Experience snapshot",
      lead: "My experience spans both SaaS product development and critical banking infrastructure.",
      detail:
        "I've built backend services, automation platforms, internal tools, and authentication flows for systems where operational safety, consistency, and maintainability were essential."
    },
    intro: [
      "I work at the intersection of backend engineering, systems architecture, and DevOps-minded execution.",
      "My background combines product development in a SaaS startup with engineering work in critical banking infrastructure, which shaped the way I build software: reliable in production, maintainable over time, and clear enough for teams to evolve with confidence.",
      "I've designed APIs, microservices, internal platforms, automation services, and authentication flows for systems where performance, operational safety, and consistency matter."
    ],
    focusAreas: [
      "Prefer simple, well-structured systems over accidental complexity.",
      "Make tradeoffs explicit and align technical decisions with real product needs.",
      "Build software that teams can understand, operate, and extend without friction.",
      "Treat reliability, observability, and delivery confidence as part of engineering, not afterthoughts."
    ],
    principles: [
      "I'm most useful in roles where backend, architecture, and execution meet: building systems, improving foundations, and helping products scale without losing clarity."
    ]
  }
};
