import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteService } from "@/app/admin/_actions/services";

export const dynamic = "force-dynamic";

export default async function ServicesListPage() {
  const services = await prisma.service.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  return (
    <>
      <AdminHeader
        title="Services"
        description="The services shown across the site and in the footer."
        action={{ href: "/admin/services/new", label: "New service" }}
      />
      <ListView
        deleteAction={deleteService}
        rows={services.map((s) => ({
          id: s.id,
          title: s.name,
          subtitle: s.shortDescription,
          badge: s.imageCategory,
          editHref: `/admin/services/${s.id}`,
        }))}
      />
    </>
  );
}
