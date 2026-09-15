import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Solution } from "@/data/solutions";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";

const accentText: Record<Solution["accent"], string> = {
  brand: "text-brand-700",
  accent: "text-accent-700",
  violet: "text-violet-700",
  amber: "text-amber-700",
};

const accentDot: Record<Solution["accent"], string> = {
  brand: "text-brand-500",
  accent: "text-accent-500",
  violet: "text-violet-500",
  amber: "text-amber-500",
};

const statusStyles: Record<Solution["status"], string> = {
  Available: "bg-accent-50 text-accent-700 ring-accent-100",
  "Coming Soon": "bg-ink-100 text-ink-600 ring-ink-200",
};

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-4xl border border-ink-100 bg-white p-3 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <ImagePlaceholder
        src={solution.image}
        title={solution.imagePlaceholder}
        alt={solution.imageAlt}
        category={solution.imageCategory}
        icon={solution.icon}
        tone={solution.accent}
        aspectRatio="16/10"
        rounded="rounded-3xl"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className={cn("text-xs font-semibold uppercase tracking-wider", accentText[solution.accent])}>
            {solution.category}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold ring-1 ring-inset",
              statusStyles[solution.status]
            )}
          >
            {solution.status}
          </span>
        </div>

        <h3 className="mt-2 font-display text-xl font-bold text-ink-900">
          {solution.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          {solution.description}
        </p>

        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {solution.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-ink-600">
              <Check className={cn("mt-0.5 h-4 w-4 flex-none", accentDot[solution.accent])} strokeWidth={2.5} />
              {h}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={cn(
            "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold",
            accentText[solution.accent]
          )}
        >
          {solution.status === "Coming Soon" ? "Register interest" : "Request a demo"}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
