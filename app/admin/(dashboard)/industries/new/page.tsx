import { AdminHeader } from "@/app/admin/_components/ui";
import { IndustryForm } from "@/app/admin/_components/forms/IndustryForm";

export const dynamic = "force-dynamic";

export default function NewIndustryPage() {
  return (
    <>
      <AdminHeader title="New industry" backHref="/admin/industries" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <IndustryForm />
      </div>
    </>
  );
}
