/**
 * Seeds the database with the site's current content — reproducing exactly
 * what used to live in data/*.ts so the live site launches unchanged.
 *
 * Idempotent: content with a natural slug is upserted; ordered lists without a
 * natural key (values, why-choose, stats) are replaced. Run with `npm run db:seed`.
 *
 * Uses relative imports (not the "@/" alias) so it runs cleanly under tsx.
 */
import { PrismaClient } from "@prisma/client";
import type { LucideIcon } from "lucide-react";
import { iconRegistry } from "../lib/icons";
import { services } from "../data/services";
import { solutions } from "../data/solutions";
import { projects } from "../data/portfolio";
import { industries } from "../data/industries";
import { site, socials, coreValues, whyChoose, stats } from "../data/site";

const prisma = new PrismaClient();

// Reverse map: Lucide component reference -> registry name string.
const iconToName = new Map<LucideIcon, string>();
for (const [name, comp] of Object.entries(iconRegistry)) {
  iconToName.set(comp as LucideIcon, name);
}
function iconName(icon: LucideIcon): string {
  const name = iconToName.get(icon);
  if (!name) {
    throw new Error(
      "Seed: an icon used in data/*.ts is missing from lib/icons.ts iconRegistry. Add it there."
    );
  }
  return name;
}

async function main() {
  console.log("Seeding services…");
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    const data = {
      name: s.name,
      shortName: s.shortName,
      tagline: s.tagline,
      icon: iconName(s.icon),
      shortDescription: s.shortDescription,
      overview: s.overview,
      features: s.features,
      outcomes: s.outcomes,
      image: s.image ?? null,
      imageAlt: s.imageAlt,
      imagePlaceholder: s.imagePlaceholder,
      imageCategory: s.imageCategory,
      order: i,
    };
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: { slug: s.slug, ...data },
      update: data,
    });
  }

  console.log("Seeding solutions…");
  for (let i = 0; i < solutions.length; i++) {
    const s = solutions[i];
    const data = {
      name: s.name,
      category: s.category,
      tagline: s.tagline,
      icon: iconName(s.icon),
      description: s.description,
      highlights: s.highlights,
      status: s.status,
      accent: s.accent,
      image: s.image ?? null,
      imageAlt: s.imageAlt,
      imagePlaceholder: s.imagePlaceholder,
      imageCategory: s.imageCategory,
      order: i,
    };
    await prisma.solution.upsert({
      where: { slug: s.slug },
      create: { slug: s.slug, ...data },
      update: data,
    });
  }

  console.log("Seeding projects…");
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const data = {
      name: p.name,
      category: p.category,
      client: p.client,
      year: p.year,
      description: p.description,
      tags: p.tags,
      image: p.image ?? null,
      imageAlt: p.imageAlt,
      imagePlaceholder: p.imagePlaceholder,
      imageCategory: p.imageCategory,
      order: i,
    };
    await prisma.project.upsert({
      where: { slug: p.slug },
      create: { slug: p.slug, ...data },
      update: data,
    });
  }

  console.log("Seeding industries…");
  for (let i = 0; i < industries.length; i++) {
    const ind = industries[i];
    const data = {
      name: ind.name,
      icon: iconName(ind.icon),
      description: ind.description,
      image: ind.image ?? null,
      imageAlt: ind.imageAlt,
      imagePlaceholder: ind.imagePlaceholder,
      imageCategory: ind.imageCategory,
      order: i,
    };
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      create: { slug: ind.slug, ...data },
      update: data,
    });
  }

  console.log("Seeding core values…");
  await prisma.coreValue.deleteMany();
  await prisma.coreValue.createMany({
    data: coreValues.map((v, i) => ({
      title: v.title,
      description: v.description,
      icon: iconName(v.icon),
      order: i,
    })),
  });

  console.log("Seeding why-choose…");
  await prisma.whyChoose.deleteMany();
  await prisma.whyChoose.createMany({
    data: whyChoose.map((w, i) => ({
      title: w.title,
      description: w.description,
      icon: iconName(w.icon),
      order: i,
    })),
  });

  console.log("Seeding stats…");
  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: stats.map((st, i) => ({
      value: st.value,
      suffix: st.suffix,
      label: st.label,
      shortLabel: st.shortLabel,
      order: i,
    })),
  });

  console.log("Seeding site settings…");
  const settings = {
    name: site.name,
    shortName: site.shortName,
    legalName: site.legalName,
    tagline: site.tagline,
    description: site.description,
    longDescription: site.longDescription,
    url: site.url,
    email: site.email,
    salesEmail: site.salesEmail,
    phonePrimary: site.phonePrimary,
    phoneSecondary: site.phoneSecondary,
    location: site.location,
    addressLines: site.addressLines,
    hours: site.hours,
    socials: socials,
  };
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    create: { id: 1, ...settings },
    update: settings,
  });

  console.log("✔ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
