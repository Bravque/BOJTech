import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site, socials } from "@/data/site";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
};

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-sm font-semibold text-ink-900">{title}</h3>
        <div className="mt-1 space-y-0.5 text-sm text-ink-500">{children}</div>
      </div>
    </div>
  );
}

export function ContactInfo({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      <InfoCard icon={Phone} title="Phone">
        <a href={`tel:${site.phonePrimary.replace(/\s/g, "")}`} className="block hover:text-brand-700">
          {site.phonePrimary}
        </a>
        <a href={`tel:${site.phoneSecondary.replace(/\s/g, "")}`} className="block hover:text-brand-700">
          {site.phoneSecondary}
        </a>
      </InfoCard>

      <InfoCard icon={Mail} title="Email">
        <a href={`mailto:${site.email}`} className="block hover:text-brand-700">
          {site.email}
        </a>
        <a href={`mailto:${site.salesEmail}`} className="block hover:text-brand-700">
          {site.salesEmail}
        </a>
      </InfoCard>

      <InfoCard icon={MapPin} title="Physical Location">
        {site.addressLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </InfoCard>

      <InfoCard icon={Clock} title="Business Hours">
        {site.hours.map((h) => (
          <p key={h.days}>
            <span className="font-medium text-ink-700">{h.days}:</span> {h.time}
          </p>
        ))}
      </InfoCard>

      <div className="sm:col-span-2">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
          <span className="text-sm font-semibold text-ink-900">Follow us:</span>
          {socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-50 text-ink-600 transition-all hover:bg-brand-600 hover:text-white"
              >
                {Icon && <Icon className="h-5 w-5" />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
