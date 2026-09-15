import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with BOJ Technologies Limited. Request a quote, book a consultation or ask about our software, digital, networking and IT services.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s talk about{" "}
            <span className="text-gradient-light">your next project</span>
          </>
        }
        description="Tell us what you need and our team will get back to you quickly with the right advice, a clear plan and a fair quote."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Send us a message</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 text-2xl font-bold text-ink-900 sm:text-3xl">
                  Request a quote or consultation
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-ink-500">
                  Fill in the form below and we&apos;ll respond within one
                  business day.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal delay={120}>
                <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                  Contact information
                </h2>
                <p className="mt-3 text-ink-500">
                  Prefer to reach us directly? Here&apos;s how to find us.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8">
                  <ContactInfo />
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-ink-100">
                  <ImagePlaceholder
                    title="Our location on the map"
                    description="Interactive map of BOJ Technologies offices"
                    alt="Map showing BOJ Technologies location at Creadex Building, Migori, Kenya"
                    category="Map"
                    icon={MapPin}
                    tone="accent"
                    aspectRatio="16/9"
                    rounded="rounded-3xl"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
