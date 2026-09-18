import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteSettings } from "@/lib/content";

export async function CTASection({
  eyebrow = "Let's work together",
  title = "Let's Build Something Great",
  description = "Whether you need custom software, a modern website, reliable connectivity or a full digital transformation, our team is ready to help you plan, build and grow.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const site = await getSiteSettings();
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-950 px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* background visuals */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.18] bg-grid-light"
              style={{ backgroundSize: "36px 36px" }}
            />
            <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-brand-600/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-accent-500/30 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-inset ring-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                {eyebrow}
              </span>
              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-100/75 sm:text-lg">
                {description}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="light" size="lg">
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={`tel:${site.phonePrimary.replace(/\s/g, "")}`} variant="outline-light" size="lg">
                  <Phone className="h-4 w-4" />
                  {site.phonePrimary}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
