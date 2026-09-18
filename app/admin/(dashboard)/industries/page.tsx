import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteIndustry } from "@/app/admin/_actions/industries";

export const dynamic = "force-dynamic";

export default async function IndustriesListPage() {
  const industries = await prisma.industry.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  return (
    <>
      <AdminHeader
        title="Industries"
        description="Sectors shown on the Industries page and home."
        action={{ href: "/admin/industries/new", label: "New industry" }}
      />
      <ListView
        deleteAction={deleteIndustry}
        rows={industries.map((i) => ({
          id: i.id,
          title: i.name,
          subtitle: i.description,
          badge: i.imageCategory,
          editHref: `/admin/industries/${i.id}`,
        }))}
      />
    </>
  );
}
