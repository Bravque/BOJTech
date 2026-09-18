import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { IconItemForm } from "@/app/admin/_components/forms/IconItemForm";
import { saveWhyChoose } from "@/app/admin/_actions/misc";

export const dynamic = "force-dynamic";

export default async function EditWhyChoosePage({ params }: { params: { id: string } }) {
  const item = await prisma.whyChoose.findUnique({ where: { id: Number(params.id) } });
  if (!item) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${item.title}`} backHref="/admin/why-choose" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <IconItemForm
          action={saveWhyChoose}
          submitLabel="Save changes"
          record={{ id: item.id, title: item.title, description: item.description, icon: item.icon, order: item.order }}
        />
      </div>
    </>
  );
}
