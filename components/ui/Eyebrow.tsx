import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "brand"
          ? "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100"
          : "bg-white/10 text-white ring-1 ring-inset ring-white/20",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "brand" ? "bg-accent-500" : "bg-accent-400"
        )}
      />
      {children}
    </span>
  );
}
