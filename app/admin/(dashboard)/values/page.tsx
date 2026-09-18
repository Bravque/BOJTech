import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteCoreValue } from "@/app/admin/_actions/misc";

export const dynamic = "force-dynamic";

export default async function ValuesListPage() {
  const values = await prisma.coreValue.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  return (
    <>
      <AdminHeader
        title="Core values"
        description="Shown on the About page."
        action={{ href: "/admin/values/new", label: "New value" }}
      />
      <ListView
        deleteAction={deleteCoreValue}
        rows={values.map((v) => ({
          id: v.id,
          title: v.title,
          subtitle: v.description,
          editHref: `/admin/values/${v.id}`,
        }))}
      />
    </>
  );
}
