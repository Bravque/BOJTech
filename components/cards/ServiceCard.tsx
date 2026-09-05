import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
        className
      )}
    >
      {/* Illustration / visual area */}
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800">
        <div
          className="absolute inset-0 opacity-30 bg-grid-light"
          style={{ backgroundSize: "22px 22px" }}
        />
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-400/30 blur-2xl transition-transform duration-500 group-hover:scale-125" />
        <div className="absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-brand-400/30 blur-2xl" />
        <div className="relative flex h-full items-center px-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
          </span>
          <span className="ml-auto text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/70">
            {service.imageCategory}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-ink-900">
          {service.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
          {service.shortDescription}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
