import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        align === "center" && "mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={cn(
            "text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]",
            tone === "light" ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p
            className={cn(
              "text-base leading-relaxed sm:text-lg",
              tone === "light" ? "text-brand-100/80" : "text-ink-500"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
