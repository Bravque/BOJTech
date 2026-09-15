import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/home/Hero";
import { TrustedStrip } from "@/components/sections/home/TrustedStrip";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { FeaturedSolutions } from "@/components/sections/home/FeaturedSolutions";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { BrandsStrip } from "@/components/sections/home/BrandsStrip";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedStrip />
      <IntroSection />
      <ServicesOverview />
      <FeaturedSolutions />
      <WhyChooseSection tone="light" />
      <BrandsStrip />
      <IndustriesSection limit={6} />

      {/* Contact section */}
      <section className="bg-ink-50/60 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Get in touch"
                title="Let's talk about your technology needs"
                description="Have a project in mind or need advice on the right technology? Reach out — our team is ready to help you plan, build and grow."
              />
              <Reveal delay={200}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/contact" size="lg">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/portfolio" variant="outline" size="lg">
                    View Our Work
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <ContactInfo />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
