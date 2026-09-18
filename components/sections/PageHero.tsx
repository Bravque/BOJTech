import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-[calc(var(--header-height)+3.5rem)] pb-16 text-white sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] bg-grid-light"
        style={{ backgroundSize: "40px 40px" }}
      />
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Container className="relative">
        <div className="max-w-3xl">
          {breadcrumbs && (
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-brand-100/60">
                  {breadcrumbs.map((crumb, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      {crumb.href ? (
                        <Link href={crumb.href} className="transition-colors hover:text-white">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-white">{crumb.label}</span>
                      )}
                      {i < breadcrumbs.length - 1 && (
                        <ChevronRight className="h-3.5 w-3.5 text-brand-100/40" />
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          )}

          <Reveal>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100/75">
                {description}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={220}>
              <div className="mt-8">{children}</div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
