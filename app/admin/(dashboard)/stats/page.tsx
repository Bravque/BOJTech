import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteStat } from "@/app/admin/_actions/misc";

export const dynamic = "force-dynamic";

export default async function StatsListPage() {
  const stats = await prisma.stat.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  return (
    <>
      <AdminHeader
        title="Stats"
        description="The counters shown on the About page."
        action={{ href: "/admin/stats/new", label: "New stat" }}
      />
      <ListView
        deleteAction={deleteStat}
        rows={stats.map((s) => ({
          id: s.id,
          title: `${s.value}${s.suffix}`,
          subtitle: s.label,
          editHref: `/admin/stats/${s.id}`,
        }))}
      />
    </>
  );
}
