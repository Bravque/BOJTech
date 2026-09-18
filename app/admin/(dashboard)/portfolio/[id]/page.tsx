import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { ProjectForm } from "@/app/admin/_components/forms/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: Number(params.id) } });
  if (!project) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${project.name}`} backHref="/admin/portfolio" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <ProjectForm
          record={{
            id: project.id,
            slug: project.slug,
            name: project.name,
            category: project.category,
            client: project.client,
            year: project.year,
            description: project.description,
            tags: (project.tags as string[]) ?? [],
            image: project.image,
            imageAlt: project.imageAlt,
            imagePlaceholder: project.imagePlaceholder,
            imageCategory: project.imageCategory,
            order: project.order,
          }}
        />
      </div>
    </>
  );
}
