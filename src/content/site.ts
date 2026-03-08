import type { SiteContent } from "@/types/content";

export const siteConfig: SiteContent & { domain: string; github: string } = {
  name: "Gaston Gonzalez",
  title: "Gaston Gonzalez | Software Engineer",
  description:
    "Software engineer focused on backend systems, architecture, and production-ready software.",
  domain: "gastong256.dev",
  url: "https://gastong256.dev",
  github: "https://github.com/gastong256",
  contactEmail: "hello@gastong256.dev",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Product", href: "/product" },
    { label: "Contact", href: "/contact" }
  ],
  social: [
    { label: "GitHub", href: "https://github.com/gastong256" }
  ]
};

export const siteContent = siteConfig;
