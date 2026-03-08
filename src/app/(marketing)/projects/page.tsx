import type { Metadata } from "next";

import { ProjectsPage } from "@/components/pages/projects-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Selected projects covering product architecture and frontend delivery.",
  path: "/projects"
});

export default function ProjectsRoutePage() {
  return <ProjectsPage />;
}
