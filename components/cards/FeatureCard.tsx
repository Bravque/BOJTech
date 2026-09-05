import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "light",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1",
        isDark
          ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
          : "border-ink-100 bg-white shadow-soft hover:border-brand-200 hover:shadow-lift",
        className
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
          isDark
            ? "bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-accent-300 ring-1 ring-inset ring-white/10"
            : "bg-gradient-to-br from-brand-50 to-accent-50 text-brand-600 ring-1 ring-inset ring-brand-100"
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h3
        className={cn(
          "mt-5 font-display text-lg font-semibold",
          isDark ? "text-white" : "text-ink-900"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          isDark ? "text-brand-100/70" : "text-ink-500"
        )}
      >
        {description}
      </p>
    </div>
  );
}
