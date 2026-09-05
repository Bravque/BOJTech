import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore selected projects by BOJ Technologies — software, websites, mobile applications, graphic design, networking and digital marketing work.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Projects that deliver{" "}
            <span className="text-gradient-light">real results</span>
          </>
        }
        description="A selection of the software, websites, apps, designs, networks and campaigns we've delivered. New projects are added as our portfolio grows."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <PortfolioGrid />
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Have a project in mind?"
        title="Let's create your next success story"
        description="From concept to launch, we'll help you bring your project to life. Tell us what you're building and let's get started."
      />
    </>
  );
}
