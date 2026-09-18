import { AdminHeader } from "@/app/admin/_components/ui";
import { StatForm } from "@/app/admin/_components/forms/StatForm";

export const dynamic = "force-dynamic";

export default function NewStatPage() {
  return (
    <>
      <AdminHeader title="New stat" backHref="/admin/stats" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <StatForm />
      </div>
    </>
  );
}
