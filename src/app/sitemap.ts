import type { MetadataRoute } from "next";

import { projectsContent } from "@/content/projects";
import { getPublicSiteUrl } from "@/lib/env";

const routes = ["", "/about", "/projects", "/contact", "/product", "/create"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const siteUrl = getPublicSiteUrl();
  const projectRoutes = projectsContent.map(
    (project) => `/projects/${project.slug}`
  );

  return [...routes, ...projectRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.65 : 0.7,
  }));
}
