import type { SiteContent } from "@/types/content";

export const siteContent: SiteContent & {
  domain: string;
  github: string;
  linkedin: string;
} = {
  name: "Gaston Gonzalez",
  title: "Gaston Gonzalez | Software Engineer",
  description:
    "Software Engineer focused on backend systems, architecture, DevOps culture, and production-ready software.",
  domain: "gastong256.dev",
  url: "https://gastong256.dev",
  github: "https://github.com/gastong256",
  linkedin: "https://www.linkedin.com/in/gastongonzalez256/",
  contactEmail: "hello@gastong256.dev",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Product", href: "/product" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/gastong256" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/gastongonzalez256/",
    },
  ],
};

export const siteConfig = siteContent;
