import type { Metadata } from "next";
import { Layers, Plug, CreditCard } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { CTASection } from "@/components/sections/CTASection";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Discover BOJ Technologies' products and solutions — BOJ POS, BOJ Software Solutions, BOJ Digital, BOJ Creative, WiFi Chap Chap and more.",
  alternates: { canonical: "/solutions" },
};

const futureReady = [
  {
    icon: Layers,
    title: "Built to scale",
    description: "Every solution is architected to grow with your organization.",
  },
  {
    icon: Plug,
    title: "Integration-ready",
    description: "Designed to connect with the tools and systems you already use.",
  },
  {
    icon: CreditCard,
    title: "Payment-ready",
    description: "Prepared for future online payment and marketplace integrations.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products & solutions"
        title={
          <>
            A growing ecosystem of{" "}
            <span className="text-gradient-light">BOJ technology products</span>
          </>
        }
        description="Beyond services, BOJ Technologies is building focused products and brands — each solving a specific need, all designed to work together and scale for the future."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {solutions.map((solution, i) => (
              <Reveal key={solution.slug} delay={(i % 2) * 90}>
                <SolutionCard solution={solution} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Future ready */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] bg-grid-light"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
        <Container className="relative">
          <SectionHeader
            tone="light"
            eyebrow="Designed for the future"
            title="New products, built on a trusted foundation"
            description="Our platform is designed so new products — including delivery and digital marketplace platforms — can be added without disruption."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {futureReady.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 90}>
                  <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/25 to-accent-500/25 text-accent-300 ring-1 ring-inset ring-white/10">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-100/70">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Interested in our products?"
        title="Book a demo or register your interest"
        description="Want to see BOJ POS in action or learn more about our upcoming products? Get in touch and we'll set you up."
      />
    </>
  );
}
