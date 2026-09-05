import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

export function ServicesOverview() {
  const featured = services.slice(0, 6);
  return (
    <section className="relative bg-ink-50/60 py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="What we do"
          title="Complete technology solutions under one roof"
          description="From custom software and modern websites to networking, connectivity and IT support — everything your organization needs to operate and grow, delivered by one trusted partner."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 90}>
              <ServiceCard service={service} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Button href="/services" variant="secondary" size="lg">
              View All 12 Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
