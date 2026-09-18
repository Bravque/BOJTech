import { AdminHeader } from "@/app/admin/_components/ui";
import { ServiceForm } from "@/app/admin/_components/forms/ServiceForm";

export const dynamic = "force-dynamic";

export default function NewServicePage() {
  return (
    <>
      <AdminHeader title="New service" backHref="/admin/services" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <ServiceForm />
      </div>
    </>
  );
}
