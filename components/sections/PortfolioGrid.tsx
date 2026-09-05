"use client";

import { useMemo, useState } from "react";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { projects, projectCategories } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const filters = ["All", ...projectCategories] as const;

export function PortfolioGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active]
  );

  return (
    <div>
      {/* filter tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              active === filter
                ? "bg-brand-600 text-white shadow-soft"
                : "border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700"
            )}
            aria-pressed={active === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <PortfolioCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink-500">
          No projects in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}
