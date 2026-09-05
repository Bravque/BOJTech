import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";

export function PortfolioCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      <div className="relative overflow-hidden">
        {/* zooming visual */}
        <div className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]">
          <ImagePlaceholder
            src={project.image}
            title={project.imagePlaceholder}
            alt={project.imageAlt}
            category={project.imageCategory}
            aspectRatio="4/3"
            rounded="rounded-none"
            tone="brand"
          />
        </div>

        {/* category chip (always visible) */}
        <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 shadow-soft backdrop-blur">
          {project.category}
        </span>

        {/* hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="translate-y-3 text-sm leading-relaxed text-brand-100/90 transition-transform duration-300 group-hover:translate-y-0">
            {project.description}
          </p>
          <span className="mt-4 inline-flex w-fit translate-y-3 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-900 transition-transform duration-300 group-hover:translate-y-0">
            View Project
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* footer info */}
      <div className="flex items-center justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-base font-semibold text-ink-900">
            {project.name}
          </h3>
          <p className="mt-0.5 text-xs text-ink-400">
            {project.client} · {project.year}
          </p>
        </div>
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink-50 text-ink-500 transition-colors group-hover:bg-brand-600 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
