import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteWhyChoose } from "@/app/admin/_actions/misc";

export const dynamic = "force-dynamic";

export default async function WhyChooseListPage() {
  const items = await prisma.whyChoose.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  return (
    <>
      <AdminHeader
        title="Why choose us"
        description="Points shown in the 'Why choose BOJ' sections."
        action={{ href: "/admin/why-choose/new", label: "New point" }}
      />
      <ListView
        deleteAction={deleteWhyChoose}
        rows={items.map((v) => ({
          id: v.id,
          title: v.title,
          subtitle: v.description,
          editHref: `/admin/why-choose/${v.id}`,
        }))}
      />
    </>
  );
}
