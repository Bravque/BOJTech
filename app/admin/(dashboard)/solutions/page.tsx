import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteSolution } from "@/app/admin/_actions/solutions";

export const dynamic = "force-dynamic";

export default async function SolutionsListPage() {
  const solutions = await prisma.solution.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  return (
    <>
      <AdminHeader
        title="Solutions"
        description="BOJ product brands shown on the Solutions page and home."
        action={{ href: "/admin/solutions/new", label: "New solution" }}
      />
      <ListView
        deleteAction={deleteSolution}
        rows={solutions.map((s) => ({
          id: s.id,
          title: s.name,
          subtitle: s.category,
          badge: s.status,
          editHref: `/admin/solutions/${s.id}`,
        }))}
      />
    </>
  );
}
