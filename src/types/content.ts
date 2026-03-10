export type NavigationItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteContent = {
  name: string;
  title: string;
  description: string;
  url: string;
  navigation: NavigationItem[];
  social: SocialLink[];
  contactEmail: string;
};

export type ProfileHighlight = {
  title: string;
  description: string;
};

export type AboutDocument = {
  fileName: string;
  language: string;
  lastUpdated: string;
  title: string;
  profileRole: string;
  experienceSnapshot: {
    title: string;
    lead: string;
    detail: string;
  };
  intro: string[];
  focusAreas: string[];
  principles: string[];
};

export type ProfileContent = {
  fullName: string;
  role: string;
  location: string;
  summary: string;
  highlights: ProfileHighlight[];
  aboutDocument: AboutDocument;
};

export type ProjectItem = {
  slug: string;
  name: string;
  detailTitle?: string;
  status?: {
    label: string;
    tone?: "featured" | "production" | "neutral";
  };
  summary: string;
  overview: string;
  highlights: string[];
  stackGroups?: {
    label: string;
    items: string[];
  }[];
  lastUpdated: string;
  tech: string[];
  repositories?: {
    backend?: string;
    frontend?: string;
  };
  repositoryUrl?: string;
  demoUrl?: string;
  featured?: boolean;
};

export type ProductStep = {
  title: string;
  description: string;
};

export type ProductDocLink = {
  label: string;
  href: string;
};

export type ProductContent = {
  headline: string;
  description: string;
  promise: string;
  steps: ProductStep[];
  agreementLabel: string;
  installTitle: string;
  installDescription: string;
  resultTitle: string;
  resultDescription: string;
  deliverables: {
    websiteLabel: string;
    websiteUrl: string;
    repositoryLabel: string;
    repositoryUrl: string;
  };
  docs: ProductDocLink[];
};
