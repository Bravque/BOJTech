import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getSolution } from "@/data/solutions";

export function FeaturedSolutions() {
  const pos = getSolution("boj-pos");
  if (!pos) return null;

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-grid-light"
        style={{ backgroundSize: "40px 40px" }}
      />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow tone="light">Featured solution</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                Run your business smarter with{" "}
                <span className="text-gradient-light">BOJ POS</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-base leading-relaxed text-brand-100/75 sm:text-lg">
                {pos.description}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pos.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-brand-100/85">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-500/20 text-accent-300">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/solutions" variant="light">
                  Explore Solutions
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/contact" variant="outline-light">
                  Request a Demo
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <div className="rounded-[2rem] bg-white/[0.04] p-2.5 ring-1 ring-inset ring-white/10 backdrop-blur">
                <ImagePlaceholder
                  title={pos.imagePlaceholder}
                  description="Sales, products, inventory, reports and analytics"
                  alt={pos.imageAlt}
                  category="POS Dashboard"
                  icon={pos.icon}
                  tone="dark"
                  aspectRatio="4/3"
                  rounded="rounded-[1.6rem]"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/10 bg-ink-900/90 px-5 py-4 shadow-lift backdrop-blur sm:block">
                <p className="text-xs text-brand-100/60">Today&apos;s sales</p>
                <p className="font-display text-2xl font-bold text-white">KSh 248,900</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
