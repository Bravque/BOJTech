import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { ServiceForm } from "@/app/admin/_components/forms/ServiceForm";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: Number(params.id) } });
  if (!service) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${service.name}`} backHref="/admin/services" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <ServiceForm
          record={{
            id: service.id,
            slug: service.slug,
            name: service.name,
            shortName: service.shortName,
            tagline: service.tagline,
            icon: service.icon,
            shortDescription: service.shortDescription,
            overview: service.overview,
            features: (service.features as string[]) ?? [],
            outcomes: (service.outcomes as string[]) ?? [],
            image: service.image,
            imageAlt: service.imageAlt,
            imagePlaceholder: service.imagePlaceholder,
            imageCategory: service.imageCategory,
            order: service.order,
          }}
        />
      </div>
    </>
  );
}
