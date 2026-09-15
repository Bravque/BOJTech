import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { CTASection } from "@/components/sections/CTASection";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "BOJ Technologies delivers technology solutions for retail, hospitality, SMEs, corporates, education, NGOs, government, healthcare and startups across Kenya.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries we serve"
        title={
          <>
            Technology solutions for{" "}
            <span className="text-gradient-light">every sector</span>
          </>
        }
        description="From retail floors to government offices, we tailor our software, connectivity and IT solutions to the realities of the industries we serve."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 3) * 80}>
                <IndustryCard industry={industry} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseSection tone="dark" limit={4} />

      <CTASection
        eyebrow="Your industry, our expertise"
        title="Let's build the right solution for your sector"
        description="Tell us about your organization and we'll tailor a technology solution that fits your industry and goals."
      />
    </>
  );
}
