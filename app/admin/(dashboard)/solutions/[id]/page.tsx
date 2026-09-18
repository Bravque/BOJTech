import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { SolutionForm } from "@/app/admin/_components/forms/SolutionForm";

export const dynamic = "force-dynamic";

export default async function EditSolutionPage({ params }: { params: { id: string } }) {
  const solution = await prisma.solution.findUnique({ where: { id: Number(params.id) } });
  if (!solution) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${solution.name}`} backHref="/admin/solutions" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <SolutionForm
          record={{
            id: solution.id,
            slug: solution.slug,
            name: solution.name,
            category: solution.category,
            tagline: solution.tagline,
            icon: solution.icon,
            description: solution.description,
            highlights: (solution.highlights as string[]) ?? [],
            status: solution.status,
            accent: solution.accent,
            image: solution.image,
            imageAlt: solution.imageAlt,
            imagePlaceholder: solution.imagePlaceholder,
            imageCategory: solution.imageCategory,
            order: solution.order,
          }}
        />
      </div>
    </>
  );
}
