import { AdminHeader } from "@/app/admin/_components/ui";
import { SolutionForm } from "@/app/admin/_components/forms/SolutionForm";

export const dynamic = "force-dynamic";

export default function NewSolutionPage() {
  return (
    <>
      <AdminHeader title="New solution" backHref="/admin/solutions" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <SolutionForm />
      </div>
    </>
  );
}
