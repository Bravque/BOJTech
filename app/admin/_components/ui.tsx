import Link from "next/link";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { cn } from "@/lib/utils";

export function AdminHeader({
  title,
  description,
  action,
  backHref,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
  backHref?: string;
}) {
  return (
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">{title}</h1>
          {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
        </div>
        {action && (
          <Link
            href={action.href}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" /> {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-ink-100 bg-white p-6 shadow-soft", className)}>
      {children}
    </div>
  );
}

export type ListRow = {
  id: string | number;
  title: string;
  subtitle?: string;
  badge?: string;
  editHref: string;
};

export function ListView({
  rows,
  deleteAction,
  emptyLabel = "Nothing here yet.",
}: {
  rows: ListRow[];
  deleteAction: (formData: FormData) => Promise<void>;
  emptyLabel?: string;
}) {
  if (rows.length === 0) {
    return (
      <Card>
        <p className="text-center text-sm text-ink-500">{emptyLabel}</p>
      </Card>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
      <ul className="divide-y divide-ink-100">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-ink-900">{row.title}</p>
                {row.badge && (
                  <span className="inline-block rounded-full bg-ink-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-600">
                    {row.badge}
                  </span>
                )}
              </div>
              {row.subtitle && <p className="mt-0.5 truncate text-sm text-ink-500">{row.subtitle}</p>}
            </div>
            <div className="flex flex-none items-center gap-1">
              <Link
                href={row.editHref}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-50"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Link>
              <form action={deleteAction}>
                <input type="hidden" name="id" value={row.id} />
                <DeleteButton />
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
