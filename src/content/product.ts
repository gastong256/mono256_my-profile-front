import type { ProductContent } from "@/types/content";

export const productContent: ProductContent = {
  headline: "Generate your personal website in two clicks",
  description:
    "The product evolves this website into a developer-facing generator that automates setup and deployment.",
  promise: "Meet me and generate your personal website in two clicks.",
  steps: [
    {
      title: "Connect GitHub",
      description:
        "Authorize repository access so the generator can understand your projects and developer profile."
    },
    {
      title: "Connect Vercel",
      description:
        "Authorize deployment so your generated website is built and published automatically."
    },
    {
      title: "Launch instantly",
      description:
        "Receive a production-ready personal website with structured sections and reliable defaults."
    }
  ]
};
