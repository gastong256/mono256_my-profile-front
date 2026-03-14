import type { ProductContent } from "@/types/content";

export const productContent: ProductContent = {
  headline: "g₃ gist-gain generator · coming soon",
  description:
    "Developers often postpone building a personal website because design, implementation, deployment, and maintenance take time better spent on real product work.",
  promise:
    "Connect GitHub. Connect Vercel. Get your repository and deployed website.",
  steps: [
    {
      title: "Connect GitHub",
      description:
        "Import repositories and profile data to generate your developer site.",
    },
    {
      title: "Connect Vercel",
      description:
        "Connect deployment to publish the generated website with production-ready defaults.",
    },
    {
      title: "Generate and deploy",
      description:
        "Receive a repository and live website baseline you can immediately iterate on.",
    },
  ],
  agreementLabel:
    "I confirm that all generated assets (code, repository, deployment, and content) remain my property as the user. This product does not claim ownership over generated outputs.",
  installTitle: "Connections preview",
  installDescription:
    "Preview the upcoming connection flow for GitHub and Vercel.",
  resultTitle: "Preview summary",
  resultDescription:
    "This preview shows the expected deliverables and next-step documentation. Public release is coming soon.",
  deliverables: {
    websiteLabel: "Current baseline website",
    websiteUrl: "https://gastong256.dev",
    repositoryLabel: "Current baseline repository",
    repositoryUrl: "https://github.com/gastong256/mono256_my-profile-front",
  },
  docs: [
    {
      label: "Project README",
      href: "https://github.com/gastong256/mono256_my-profile-front#readme",
    },
    {
      label: "Vercel documentation",
      href: "https://vercel.com/docs",
    },
    {
      label: "GitHub OAuth apps guide",
      href: "https://docs.github.com/en/apps/oauth-apps",
    },
  ],
};
