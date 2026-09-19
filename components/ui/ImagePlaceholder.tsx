import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "violet" | "amber" | "dark";

const toneStyles: Record<
  Tone,
  { bg: string; blobA: string; blobB: string; icon: string; ring: string; chip: string }
> = {
  brand: {
    bg: "from-brand-50 via-white to-accent-50",
    blobA: "bg-brand-300/40",
    blobB: "bg-accent-300/40",
    icon: "text-brand-500",
    ring: "ring-brand-100",
    chip: "bg-white/80 text-brand-700 ring-brand-100",
  },
  accent: {
    bg: "from-accent-50 via-white to-brand-50",
    blobA: "bg-accent-300/40",
    blobB: "bg-brand-300/40",
    icon: "text-accent-600",
    ring: "ring-accent-100",
    chip: "bg-white/80 text-accent-700 ring-accent-100",
  },
  violet: {
    bg: "from-violet-50 via-white to-brand-50",
    blobA: "bg-violet-300/40",
    blobB: "bg-brand-300/40",
    icon: "text-violet-500",
    ring: "ring-violet-100",
    chip: "bg-white/80 text-violet-700 ring-violet-100",
  },
  amber: {
    bg: "from-amber-50 via-white to-orange-50",
    blobA: "bg-amber-300/40",
    blobB: "bg-orange-300/40",
    icon: "text-amber-600",
    ring: "ring-amber-100",
    chip: "bg-white/80 text-amber-700 ring-amber-100",
  },
  dark: {
    bg: "from-ink-900 via-ink-900 to-ink-950",
    blobA: "bg-brand-500/30",
    blobB: "bg-accent-500/25",
    icon: "text-brand-300",
    ring: "ring-white/10",
    chip: "bg-white/10 text-brand-100 ring-white/15",
  },
};

export type ImagePlaceholderProps = {
  /** Real image source. When provided, the placeholder is replaced by an optimized image. */
  src?: string;
  /** Descriptive title shown on the placeholder and used as guidance for the real image. */
  title: string;
  /** Longer description of what belongs here. */
  description?: string;
  /** Alt text for accessibility (used for both placeholder and real image). */
  alt?: string;
  /** CSS aspect-ratio value, e.g. "16/9", "4/3", "1/1", "3/4". */
  aspectRatio?: string;
  /** Category chip label. */
  category?: string;
  /** Optional overlay text rendered over the visual. */
  overlayText?: string;
  /** Icon representing the image subject. */
  icon?: LucideIcon;
  tone?: Tone;
  className?: string;
  rounded?: string;
  priority?: boolean;
};

export function ImagePlaceholder({
  src,
  title,
  description,
  alt,
  aspectRatio = "16/9",
  category,
  overlayText,
  icon: Icon = ImageIcon,
  tone = "brand",
  className,
  rounded = "rounded-3xl",
  priority,
}: ImagePlaceholderProps) {
  const styles = toneStyles[tone];
  const isDark = tone === "dark";
  // Admin-managed images (DB-served /api/media, legacy /uploads, or pasted
  // remote URLs) can't go through the Next image optimizer on the managed host —
  // it rejects them with 400. Serve those directly; keep optimization for
  // build-time assets under /images.
  const unoptimized =
    typeof src === "string" &&
    (src.startsWith("/uploads/") ||
      src.startsWith("/api/media/") ||
      /^https?:\/\//.test(src));

  return (
    <figure
      className={cn(
        "group relative overflow-hidden ring-1 ring-inset",
        rounded,
        styles.ring,
        className
      )}
      style={{ aspectRatio }}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover"
            priority={priority}
            unoptimized={unoptimized}
          />
          {overlayText && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-5 text-sm font-medium text-white">
              {overlayText}
            </figcaption>
          )}
        </>
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br p-6 text-center",
            styles.bg
          )}
          role="img"
          aria-label={alt ?? title}
        >
          {/* abstract tech pattern */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 opacity-[0.5]",
              isDark ? "bg-grid-light" : "bg-grid-slate"
            )}
            style={{ backgroundSize: "28px 28px" }}
          />
          <div
            className={cn(
              "pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl",
              styles.blobA
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute -bottom-12 -right-8 h-44 w-44 rounded-full blur-3xl",
              styles.blobB
            )}
          />

          {/* content */}
          <div className="relative flex flex-col items-center gap-3">
            <span
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 shadow-soft ring-1 ring-inset transition-transform duration-500 group-hover:scale-105",
                styles.ring,
                isDark && "bg-white/10"
              )}
            >
              <Icon className={cn("h-7 w-7", styles.icon)} strokeWidth={1.75} />
            </span>
            <div className="max-w-[85%]">
              <p
                className={cn(
                  "font-display text-sm font-semibold sm:text-base",
                  isDark ? "text-white" : "text-ink-800"
                )}
              >
                {title}
              </p>
              {description && (
                <p
                  className={cn(
                    "mt-1 text-xs leading-relaxed",
                    isDark ? "text-brand-100/70" : "text-ink-500"
                  )}
                >
                  {description}
                </p>
              )}
            </div>
            <span
              className={cn(
                "mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider ring-1 ring-inset",
                styles.chip
              )}
            >
              <ImageIcon className="h-3 w-3" strokeWidth={2} />
              {category ?? "Image Placeholder"}
            </span>
          </div>

          {overlayText && (
            <figcaption
              className={cn(
                "absolute inset-x-0 bottom-0 p-4 text-xs font-medium",
                isDark ? "text-brand-100/80" : "text-ink-500"
              )}
            >
              {overlayText}
            </figcaption>
          )}
        </div>
      )}
    </figure>
  );
}
