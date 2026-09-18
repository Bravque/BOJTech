import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { IconItemForm } from "@/app/admin/_components/forms/IconItemForm";
import { saveCoreValue } from "@/app/admin/_actions/misc";

export const dynamic = "force-dynamic";

export default async function EditValuePage({ params }: { params: { id: string } }) {
  const value = await prisma.coreValue.findUnique({ where: { id: Number(params.id) } });
  if (!value) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${value.title}`} backHref="/admin/values" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <IconItemForm
          action={saveCoreValue}
          submitLabel="Save changes"
          record={{ id: value.id, title: value.title, description: value.description, icon: value.icon, order: value.order }}
        />
      </div>
    </>
  );
}
