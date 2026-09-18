import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { StatForm } from "@/app/admin/_components/forms/StatForm";

export const dynamic = "force-dynamic";

export default async function EditStatPage({ params }: { params: { id: string } }) {
  const stat = await prisma.stat.findUnique({ where: { id: Number(params.id) } });
  if (!stat) notFound();

  return (
    <>
      <AdminHeader title={`Edit stat: ${stat.value}${stat.suffix}`} backHref="/admin/stats" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <StatForm
          record={{
            id: stat.id,
            value: stat.value,
            suffix: stat.suffix,
            label: stat.label,
            shortLabel: stat.shortLabel,
            order: stat.order,
          }}
        />
      </div>
    </>
  );
}
