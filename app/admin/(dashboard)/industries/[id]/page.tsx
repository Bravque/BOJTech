import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { IndustryForm } from "@/app/admin/_components/forms/IndustryForm";

export const dynamic = "force-dynamic";

export default async function EditIndustryPage({ params }: { params: { id: string } }) {
  const industry = await prisma.industry.findUnique({ where: { id: Number(params.id) } });
  if (!industry) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${industry.name}`} backHref="/admin/industries" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <IndustryForm
          record={{
            id: industry.id,
            slug: industry.slug,
            name: industry.name,
            icon: industry.icon,
            description: industry.description,
            image: industry.image,
            imageAlt: industry.imageAlt,
            imagePlaceholder: industry.imagePlaceholder,
            imageCategory: industry.imageCategory,
            order: industry.order,
          }}
        />
      </div>
    </>
  );
}
