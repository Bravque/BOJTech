import type { Metadata } from "next";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore BOJ Technologies' full range of services — software development, web and mobile apps, POS systems, design, digital marketing, hardware, networking, connectivity, IT consultancy and support.",
  alternates: { canonical: "/services" },
};

export const dynamic = "force-dynamic";

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "We listen, assess your needs and define clear goals and scope.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "We plan the solution, architecture and experience around your workflows.",
  },
  {
    icon: Code2,
    title: "Build",
    description: "We develop, configure and test with a focus on quality and reliability.",
  },
  {
    icon: Rocket,
    title: "Deploy & Support",
    description: "We launch, train your team and provide ongoing maintenance and support.",
  },
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            Everything your organization needs to{" "}
            <span className="text-gradient-light">grow with technology</span>
          </>
        }
        description="Twelve specialist services spanning software, digital, hardware and connectivity — delivered by one dependable partner."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 80}>
                <ServiceCard service={service} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] bg-grid-light"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-brand-600/25 blur-3xl" />
        <Container className="relative">
          <SectionHeader
            tone="light"
            eyebrow="How we work"
            title="A clear, collaborative delivery process"
            description="We keep every engagement transparent and structured — so you always know what's happening and what comes next."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 90}>
                  <div className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <span className="font-display text-sm font-bold text-accent-300">
                      0{i + 1}
                    </span>
                    <span className="mt-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/25 to-accent-500/25 text-white ring-1 ring-inset ring-white/10">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-100/70">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Not sure where to start?"
        title="Let's find the right solution together"
        description="Tell us about your goals and our team will recommend the best mix of services for your organization."
      />
    </>
  );
}
