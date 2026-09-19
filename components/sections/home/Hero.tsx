import { ArrowRight, Sparkles, Wifi, ShieldCheck, Activity } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { stats } from "@/data/site";

export function Hero() {
  const heroStats = stats.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-white pt-[calc(var(--header-height)+2.5rem)]">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] bg-grid-slate [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        style={{ backgroundSize: "44px 44px" }}
      />
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />

      <Container className="relative pb-20 pt-10 sm:pt-14 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div className="max-w-2xl">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft ring-1 ring-inset ring-brand-100">
                <Sparkles className="h-3.5 w-3.5 text-accent-500" />
                Innovative ICT solutions in Kenya
              </span>
            </div>

            <h1
              className="mt-6 text-4xl font-bold leading-[1.05] text-ink-900 animate-fade-up sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Technology Solutions{" "}
              <span className="text-gradient">Built for Growth.</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              BOJ Technologies Limited delivers innovative software, digital,
              networking and technology solutions that help businesses and
              organizations operate smarter, connect better and grow faster.
            </p>

            <div
              className="mt-9 flex flex-col gap-3 animate-fade-up sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <Button href="/services" size="lg">
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Get a Quote
              </Button>
            </div>

            <dl
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 animate-fade-up"
              style={{ animationDelay: "320ms" }}
            >
              {heroStats.map((stat) => (
                <div key={stat.shortLabel}>
                  <dt className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                    {stat.value}
                    {stat.suffix}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-500 sm:text-sm">
                    {stat.shortLabel}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual */}
          <div
            className="relative animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            {/* main dashboard mockup */}
            <div className="relative rounded-[2rem] bg-white p-2.5 shadow-glow ring-1 ring-ink-100">
              <ImagePlaceholder
                src="/images/software-dashboard.jpeg"
                title="Software dashboard & digital transformation"
                description="Modern African technology, software development and connectivity"
                alt="Modern technology team, software dashboard and digital network illustration"
                category="Hero Visual"
                icon={Activity}
                tone="dark"
                aspectRatio="4/3"
                rounded="rounded-[1.6rem]"
                priority
              />
            </div>

            {/* floating card: uptime */}
            <div className="absolute -left-4 bottom-8 hidden w-44 rounded-2xl border border-ink-100 bg-white/90 p-4 shadow-lift backdrop-blur animate-float sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold text-ink-700">Reliable uptime</span>
              </div>
              <p className="mt-2 font-display text-2xl font-bold text-ink-900">99.9%</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
              </div>
            </div>

            {/* floating card: connectivity */}
            <div
              className="absolute -right-3 -top-4 hidden items-center gap-2.5 rounded-2xl border border-ink-100 bg-white/90 px-4 py-3 shadow-lift backdrop-blur animate-float sm:flex"
              style={{ animationDelay: "1.5s" }}
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Wifi className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                <span className="absolute inset-0 rounded-xl bg-brand-500/40 animate-pulse-ring" />
              </span>
              <div>
                <p className="text-xs font-semibold text-ink-900">WiFi Chap Chap</p>
                <p className="text-[0.7rem] text-ink-500">Connected · 128+ users</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
