import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getSolutions } from "@/lib/content";
import { cn } from "@/lib/utils";

const accentBg: Record<string, string> = {
  brand: "from-brand-600 to-brand-800",
  accent: "from-accent-500 to-accent-700",
  violet: "from-violet-500 to-violet-700",
  amber: "from-amber-500 to-orange-600",
};

export async function BrandsStrip() {
  const solutions = await getSolutions();
  return (
    <section className="bg-ink-50/60 py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow="Our technology brands"
          title="One company. A family of specialist brands."
          description="BOJ Technologies is building a growing ecosystem of focused technology products and brands — designed to scale together and serve every part of your business."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <Reveal key={solution.slug} delay={(i % 3) * 80}>
                <Link
                  href="/solutions"
                  className="group flex h-full items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span
                    className={cn(
                      "flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-soft transition-transform duration-300 group-hover:scale-110",
                      accentBg[solution.accent]
                    )}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {solution.name}
                    </h3>
                    <p className="mt-0.5 truncate text-sm text-ink-500">
                      {solution.category}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 flex-none text-ink-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-600" />
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Button href="/solutions" variant="outline" size="lg">
              Explore All Solutions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
