import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { whyChoose } from "@/data/site";

export function WhyChooseSection({
  tone = "light",
  limit,
}: {
  tone?: "light" | "dark";
  limit?: number;
}) {
  const items = limit ? whyChoose.slice(0, limit) : whyChoose;
  const isDark = tone === "dark";

  return (
    <section
      className={
        isDark
          ? "relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24"
          : "bg-white py-20 sm:py-24"
      }
    >
      {isDark && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] bg-grid-light"
            style={{ backgroundSize: "40px 40px" }}
          />
          <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-brand-600/25 blur-3xl" />
        </>
      )}
      <Container className="relative">
        <SectionHeader
          eyebrow="Why choose BOJ"
          tone={tone}
          title="Built on trust, engineered for results"
          description="We pair modern technology with a genuine partnership approach — so every solution is reliable, scalable and focused on the outcomes that matter to you."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 80}>
              <FeatureCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                tone={tone}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
