import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteProject } from "@/app/admin/_actions/projects";

export const dynamic = "force-dynamic";

export default async function PortfolioListPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  return (
    <>
      <AdminHeader
        title="Portfolio"
        description="Projects shown on the Portfolio page."
        action={{ href: "/admin/portfolio/new", label: "New project" }}
      />
      <ListView
        deleteAction={deleteProject}
        rows={projects.map((p) => ({
          id: p.id,
          title: p.name,
          subtitle: `${p.client} · ${p.year}`,
          badge: p.category,
          editHref: `/admin/portfolio/${p.id}`,
        }))}
      />
    </>
  );
}
