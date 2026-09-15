import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Calendar, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { CTASection } from "@/components/sections/CTASection";
import { projects, getProject } from "@/data/portfolio";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);
  const fallback = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const relatedProjects = related.length > 0 ? related : fallback;

  const meta = [
    { icon: Building2, label: "Client", value: project.client },
    { icon: Calendar, label: "Year", value: project.year },
    { icon: Tag, label: "Category", value: project.category },
  ];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.name}
        description={project.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.name },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] bg-white p-2.5 shadow-card ring-1 ring-ink-100">
              <ImagePlaceholder
                src={project.image}
                title={project.imagePlaceholder}
                alt={project.imageAlt}
                category={project.imageCategory}
                aspectRatio="16/9"
                rounded="rounded-[1.6rem]"
              />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                  Project overview
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-500 sm:text-lg">
                  <p>{project.description}</p>
                  <p>
                    This project reflects our end-to-end approach — from
                    understanding the client&apos;s goals to designing, building
                    and delivering a solution that creates measurable value.
                    Detailed case study content and results can be added here as
                    the project record is expanded.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="rounded-3xl border border-ink-100 bg-ink-50/60 p-6 lg:sticky lg:top-28">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-700">
                  Project details
                </h3>
                <dl className="mt-5 space-y-5">
                  {meta.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-inset ring-ink-100">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-ink-400">
                            {item.label}
                          </dt>
                          <dd className="mt-0.5 text-sm font-medium text-ink-800">
                            {item.value}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
                <Button href="/contact" className="mt-7 w-full">
                  Start a similar project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="bg-ink-50/60 py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              More projects
            </h2>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to portfolio
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <PortfolioCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
