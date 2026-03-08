import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

const routes = ["", "/about", "/projects", "/contact", "/product", "/create"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${env.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
