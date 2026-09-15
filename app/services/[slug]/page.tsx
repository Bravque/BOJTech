import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight, ArrowUpRight, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { services, getService } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.imageCategory}
        title={service.name}
        description={service.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      >
        <Button href="/contact" variant="light">
          Request a Quote
          <ArrowRight className="h-4 w-4" />
        </Button>
      </PageHero>

      {/* Overview */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-6 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
                  {service.tagline}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
                  {service.overview}
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-8 rounded-3xl border border-ink-100 bg-ink-50/60 p-6">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-brand-600" />
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-700">
                      What you gain
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 text-sm text-ink-700 sm:text-base">
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-500 text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="lg:sticky lg:top-28">
              <Reveal delay={120}>
                <div className="rounded-[2rem] bg-white p-2.5 shadow-card ring-1 ring-ink-100">
                  <ImagePlaceholder
                    src={service.image}
                    title={service.imagePlaceholder}
                    alt={service.imageAlt}
                    category={service.imageCategory}
                    icon={service.icon}
                    aspectRatio="4/3"
                    rounded="rounded-[1.6rem]"
                  />
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-6 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
                  <h3 className="font-display text-base font-semibold text-ink-900">
                    What&apos;s included
                  </h3>
                  <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-600">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-brand-500" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-ink-50/60 py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              Related services
            </h2>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              View all services
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => {
              const RIcon = s.icon;
              return (
                <Reveal key={s.slug} delay={i * 80}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                      <RIcon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">
                      {s.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                      {s.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Get started"
        title={`Ready to get started with ${service.shortName}?`}
        description="Reach out for a free consultation and quote. We'll help you scope the right solution for your needs and budget."
      />
    </>
  );
}
