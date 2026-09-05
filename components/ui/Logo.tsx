import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import markColor from "@/public/logo-mark.png";
import markWhite from "@/public/logo-mark-white.png";

export function Logo({
  tone = "dark",
  className,
  withText = true,
}: {
  tone?: "dark" | "light";
  className?: string;
  withText?: boolean;
}) {
  const isLight = tone === "light";
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="BOJ Technologies Limited — home"
    >
      <Image
        src={isLight ? markWhite : markColor}
        alt="BOJ Technologies Limited"
        priority
        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
        sizes="40px"
      />
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-xl font-extrabold tracking-tight",
              isLight ? "text-white" : "text-ink-900"
            )}
          >
            BOJ
          </span>
          <span
            className={cn(
              "mt-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em]",
              isLight ? "text-brand-100/70" : "text-ink-500"
            )}
          >
            Technologies <span className="text-brand-600">Limited</span>
          </span>
        </span>
      )}
    </Link>
  );
}
