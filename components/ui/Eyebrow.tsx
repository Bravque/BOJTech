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
        "text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "brand" ? "text-brand-700" : "text-brand-200",
        className
      )}
    >
      {children}
    </span>
  );
}
