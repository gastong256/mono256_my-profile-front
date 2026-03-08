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

export type ProfileContent = {
  fullName: string;
  role: string;
  location: string;
  summary: string;
  highlights: ProfileHighlight[];
};

export type ProjectItem = {
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  repositoryUrl: string;
  demoUrl?: string;
  featured?: boolean;
};

export type ProductStep = {
  title: string;
  description: string;
};

export type ProductContent = {
  headline: string;
  description: string;
  promise: string;
  steps: ProductStep[];
};
