import { ArrowRight, Check, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getSiteSettings } from "@/lib/content";

const points = [
  "One partner for software, digital, hardware and connectivity",
  "Solutions tailored to your industry and workflows",
  "End-to-end delivery — from strategy to support",
];

export async function IntroSection() {
  const settings = await getSiteSettings();
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-[2rem] bg-white p-2.5 shadow-card ring-1 ring-ink-100">
                <ImagePlaceholder
                  src={settings.introImage || undefined}
                  title="BOJ Technologies team at work"
                  description="Our team working on innovative technology solutions"
                  alt="BOJ Technologies team working on innovative technology solutions"
                  category="About Visual"
                  icon={Users}
                  tone="brand"
                  aspectRatio="4/3"
                  rounded="rounded-[1.6rem]"
                />
              </div>
              {/* floating stat */}
              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-ink-100 bg-white p-5 shadow-lift sm:block">
                <p className="font-display text-3xl font-bold text-gradient">100%</p>
                <p className="mt-1 max-w-[8rem] text-xs leading-snug text-ink-500">
                  Commitment to client success and quality delivery
                </p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
                Your trusted technology partner for digital transformation
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
                BOJ Technologies Limited is an Information and Communication
                Technology company providing innovative digital, software,
                hardware, networking and technology solutions to businesses,
                organizations, institutions and individuals. We combine
                engineering, design and connectivity expertise to help our
                clients thrive in a digital world.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-7 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-ink-700 sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-8">
                <Button href="/about" variant="outline">
                  More About Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
