import "server-only";
import { prisma } from "@/lib/db";
import { resolveIcon } from "@/lib/icons";
import type { Service } from "@/data/services";
import type { Solution } from "@/data/solutions";
import type { Project } from "@/data/portfolio";
import type { Industry } from "@/data/industries";
import type { Value, WhyChoose } from "@/data/site";
import { site as fallbackSite, socials as fallbackSocials } from "@/data/site";
import type { SiteSettings, Social } from "@/types/content";
import type { SolutionAccent, SolutionStatus, ProjectCategory } from "@/types/content";

export type Stat = {
  value: string;
  suffix: string;
  label: string;
  shortLabel: string;
};

export type Client = {
  id: number;
  name: string;
  logo?: string;
  url?: string;
};

const byOrder = { orderBy: [{ order: "asc" as const }, { id: "asc" as const }] };

export async function getClients(): Promise<Client[]> {
  try {
    const rows = await prisma.client.findMany(byOrder);
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      logo: r.logo ?? undefined,
      url: r.url ?? undefined,
    }));
  } catch {
    // Table may not exist yet (pre-migration) — show the placeholder strip.
    return [];
  }
}


export async function getServices(): Promise<Service[]> {
  const rows = await prisma.service.findMany(byOrder);
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    shortName: r.shortName,
    tagline: r.tagline,
    icon: resolveIcon(r.icon),
    shortDescription: r.shortDescription,
    overview: r.overview,
    features: (r.features as string[]) ?? [],
    outcomes: (r.outcomes as string[]) ?? [],
    image: r.image ?? undefined,
    imageAlt: r.imageAlt,
    imagePlaceholder: r.imagePlaceholder,
    imageCategory: r.imageCategory,
  }));
}

export async function getService(slug: string): Promise<Service | undefined> {
  const r = await prisma.service.findUnique({ where: { slug } });
  if (!r) return undefined;
  return {
    slug: r.slug,
    name: r.name,
    shortName: r.shortName,
    tagline: r.tagline,
    icon: resolveIcon(r.icon),
    shortDescription: r.shortDescription,
    overview: r.overview,
    features: (r.features as string[]) ?? [],
    outcomes: (r.outcomes as string[]) ?? [],
    image: r.image ?? undefined,
    imageAlt: r.imageAlt,
    imagePlaceholder: r.imagePlaceholder,
    imageCategory: r.imageCategory,
  };
}

export async function getSolutions(): Promise<Solution[]> {
  const rows = await prisma.solution.findMany(byOrder);
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    category: r.category,
    tagline: r.tagline,
    icon: resolveIcon(r.icon),
    description: r.description,
    highlights: (r.highlights as string[]) ?? [],
    status: r.status as SolutionStatus,
    accent: r.accent as SolutionAccent,
    image: r.image ?? undefined,
    imageAlt: r.imageAlt,
    imagePlaceholder: r.imagePlaceholder,
    imageCategory: r.imageCategory,
  }));
}

export async function getSolution(slug: string): Promise<Solution | undefined> {
  const r = await prisma.solution.findUnique({ where: { slug } });
  if (!r) return undefined;
  return {
    slug: r.slug,
    name: r.name,
    category: r.category,
    tagline: r.tagline,
    icon: resolveIcon(r.icon),
    description: r.description,
    highlights: (r.highlights as string[]) ?? [],
    status: r.status as SolutionStatus,
    accent: r.accent as SolutionAccent,
    image: r.image ?? undefined,
    imageAlt: r.imageAlt,
    imagePlaceholder: r.imagePlaceholder,
    imageCategory: r.imageCategory,
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany(byOrder);
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    category: r.category as ProjectCategory,
    client: r.client,
    year: r.year,
    description: r.description,
    tags: (r.tags as string[]) ?? [],
    image: r.image ?? undefined,
    imageAlt: r.imageAlt,
    imagePlaceholder: r.imagePlaceholder,
    imageCategory: r.imageCategory,
  }));
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const r = await prisma.project.findUnique({ where: { slug } });
  if (!r) return undefined;
  return {
    slug: r.slug,
    name: r.name,
    category: r.category as ProjectCategory,
    client: r.client,
    year: r.year,
    description: r.description,
    tags: (r.tags as string[]) ?? [],
    image: r.image ?? undefined,
    imageAlt: r.imageAlt,
    imagePlaceholder: r.imagePlaceholder,
    imageCategory: r.imageCategory,
  };
}

export async function getIndustries(): Promise<Industry[]> {
  const rows = await prisma.industry.findMany(byOrder);
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    icon: resolveIcon(r.icon),
    description: r.description,
    image: r.image ?? undefined,
    imageAlt: r.imageAlt,
    imagePlaceholder: r.imagePlaceholder,
    imageCategory: r.imageCategory,
  }));
}

export async function getCoreValues(): Promise<Value[]> {
  const rows = await prisma.coreValue.findMany(byOrder);
  return rows.map((r) => ({
    title: r.title,
    description: r.description,
    icon: resolveIcon(r.icon),
  }));
}

export async function getWhyChoose(): Promise<WhyChoose[]> {
  const rows = await prisma.whyChoose.findMany(byOrder);
  return rows.map((r) => ({
    title: r.title,
    description: r.description,
    icon: resolveIcon(r.icon),
  }));
}

export async function getStats(): Promise<Stat[]> {
  const rows = await prisma.stat.findMany(byOrder);
  return rows.map((r) => ({
    value: r.value,
    suffix: r.suffix,
    label: r.label,
    shortLabel: r.shortLabel,
  }));
}

/**
 * Company/contact settings. Falls back to the static values in data/site.ts
 * if the settings row has not been seeded yet, so the site never crashes.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const r = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  if (!r) {
    return {
      ...fallbackSite,
      socials: fallbackSocials as Social[],
    };
  }
  return {
    name: r.name,
    shortName: r.shortName,
    legalName: r.legalName,
    tagline: r.tagline,
    description: r.description,
    longDescription: r.longDescription,
    url: r.url,
    email: r.email,
    salesEmail: r.salesEmail,
    phonePrimary: r.phonePrimary,
    phoneSecondary: r.phoneSecondary,
    location: r.location,
    addressLines: (r.addressLines as string[]) ?? [],
    hours: (r.hours as SiteSettings["hours"]) ?? [],
    socials: (r.socials as Social[]) ?? [],
  };
}
