import { AdminHeader } from "@/app/admin/_components/ui";
import { ProjectForm } from "@/app/admin/_components/forms/ProjectForm";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <>
      <AdminHeader title="New project" backHref="/admin/portfolio" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <ProjectForm />
      </div>
    </>
  );
}
