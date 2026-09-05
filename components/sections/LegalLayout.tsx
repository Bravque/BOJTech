import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";

export type LegalBlock = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function LegalLayout({
  title,
  eyebrow,
  intro,
  updated,
  sections,
}: {
  title: string;
  eyebrow: string;
  intro: string;
  updated: string;
  sections: LegalBlock[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-ink-400">Last updated: {updated}</p>
            <div className="mt-8 space-y-10">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((p, i) => (
                    <p key={i} className="mt-3 text-base leading-relaxed text-ink-600">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-ink-600">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                          <span className="text-base leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
