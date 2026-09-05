import { Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const placeholders = [
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
  "Client Logo",
];

export function TrustedStrip() {
  return (
    <section className="border-y border-ink-100 bg-ink-50/50 py-10">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-medium text-ink-500">
            Trusted technology solutions for growing businesses, institutions and
            organizations across Kenya
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {placeholders.map((label, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-ink-200 bg-white/60 px-4 py-4 text-ink-300 transition-colors hover:text-ink-400"
                title="Client logo placeholder"
              >
                <Building2 className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
