import { AdminHeader } from "@/app/admin/_components/ui";
import { ClientForm } from "@/app/admin/_components/forms/ClientForm";

export const dynamic = "force-dynamic";

export default function NewClientPage() {
  return (
    <>
      <AdminHeader title="New client" backHref="/admin/clients" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <ClientForm />
      </div>
    </>
  );
}
