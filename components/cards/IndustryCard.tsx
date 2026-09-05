import type { Industry } from "@/data/industries";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="overflow-hidden">
        <div className="transition-transform duration-[900ms] ease-out group-hover:scale-105">
          <ImagePlaceholder
            src={industry.image}
            title={industry.imagePlaceholder}
            alt={industry.imageAlt}
            category={industry.imageCategory}
            icon={industry.icon}
            aspectRatio="4/3"
            rounded="rounded-none"
            tone="accent"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <h3 className="font-display text-base font-semibold leading-tight text-ink-900">
            {industry.name}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">
          {industry.description}
        </p>
      </div>
    </article>
  );
}
