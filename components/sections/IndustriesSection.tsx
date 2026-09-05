import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { industries } from "@/data/industries";

export function IndustriesSection({ limit }: { limit?: number }) {
  const items = limit ? industries.slice(0, limit) : industries;
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Industries we serve"
          title="Technology tailored to your industry"
          description="We understand that every sector has unique needs. Our solutions are shaped around the realities of the industries and organizations we serve."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 3) * 80}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
