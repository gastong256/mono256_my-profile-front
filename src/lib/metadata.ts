import type { Metadata } from "next";

import { siteContent } from "@/content/site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const metadataBase = new URL(baseUrl);

type CreatePageMetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export const defaultMetadata: Metadata = {
  metadataBase,
  title: {
    default: siteContent.title,
    template: `%s | ${siteContent.name}`
  },
  description: siteContent.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteContent.title,
    description: siteContent.description,
    url: baseUrl,
    siteName: siteContent.name,
    type: "website"
  }
};

export function createPageMetadata({
  title,
  description,
  path = "/"
}: CreatePageMetadataInput): Metadata {
  const url = new URL(path, baseUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteContent.name,
      type: "website"
    }
  };
}
