import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { CTASection } from "@/components/sections/CTASection";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with BOJ Technologies Limited. Request a quote, book a consultation or ask about our software, digital, networking and IT services.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const services = await getServices();
  const formServices = services.map((s) => ({ slug: s.slug, name: s.name }));
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
                  <ContactForm services={formServices} />
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
                  <iframe
                    title="BOJ Technologies location in Migori, Kenya"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.32076767074645!2d34.47406425227087!3d-1.0625301354410093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d355dab57bf6a9%3A0x5e8ecd3d0f2d9dad!2sNational%20Employment%20Authority%20-%20Mogori%20County%20Office!5e0!3m2!1sen!2ske!4v1789504606698!5m2!1sen!2ske"
                    className="block aspect-[16/9] w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
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
