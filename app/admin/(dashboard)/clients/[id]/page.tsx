import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { ClientForm } from "@/app/admin/_components/forms/ClientForm";

export const dynamic = "force-dynamic";

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({ where: { id: Number(params.id) } });
  if (!client) notFound();

  return (
    <>
      <AdminHeader title={`Edit client: ${client.name}`} backHref="/admin/clients" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <ClientForm
          record={{
            id: client.id,
            name: client.name,
            logo: client.logo,
            url: client.url,
            order: client.order,
          }}
        />
      </div>
    </>
  );
}
