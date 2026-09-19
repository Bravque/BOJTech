import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteClient } from "@/app/admin/_actions/clients";

export const dynamic = "force-dynamic";

export default async function ClientsListPage() {
  const clients = await prisma.client.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
  return (
    <>
      <AdminHeader
        title="Clients"
        description="Logos shown in the 'Trusted by' strip on the home page."
        action={{ href: "/admin/clients/new", label: "New client" }}
      />
      <ListView
        deleteAction={deleteClient}
        rows={clients.map((c) => ({
          id: c.id,
          title: c.name,
          subtitle: c.logo ? "Logo set" : "No logo — hidden until you add one",
          editHref: `/admin/clients/${c.id}`,
        }))}
      />
    </>
  );
}
