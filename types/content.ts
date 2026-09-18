// Shared content enums + the SiteSettings view type. These describe the fixed
// taxonomies used by both the public site and the admin forms.

export const SOLUTION_STATUSES = ["Available", "Coming Soon"] as const;
export type SolutionStatus = (typeof SOLUTION_STATUSES)[number];

export const SOLUTION_ACCENTS = ["brand", "accent", "violet", "amber"] as const;
export type SolutionAccent = (typeof SOLUTION_ACCENTS)[number];

export const PROJECT_CATEGORIES = [
  "Software Projects",
  "Websites",
  "Mobile Applications",
  "Graphic Design",
  "Networking Projects",
  "Digital Marketing",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// Social platforms map to icons inside Footer/ContactInfo via string keys.
export const SOCIAL_ICON_KEYS = [
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "youtube",
  "tiktok",
] as const;
export type SocialIconKey = (typeof SOCIAL_ICON_KEYS)[number];

export type Social = {
  label: string;
  href: string;
  icon: string;
};

export type BusinessHour = {
  days: string;
  time: string;
};

/** Shape returned by getSiteSettings() — mirrors the old data/site.ts `site`. */
export type SiteSettings = {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  email: string;
  salesEmail: string;
  phonePrimary: string;
  phoneSecondary: string;
  location: string;
  addressLines: string[];
  hours: BusinessHour[];
  socials: Social[];
};

export const USER_ROLES = ["ADMIN", "EDITOR"] as const;
export type UserRole = (typeof USER_ROLES)[number];
