import { AdminHeader } from "@/app/admin/_components/ui";
import { IconItemForm } from "@/app/admin/_components/forms/IconItemForm";
import { saveCoreValue } from "@/app/admin/_actions/misc";

export const dynamic = "force-dynamic";

export default function NewValuePage() {
  return (
    <>
      <AdminHeader title="New core value" backHref="/admin/values" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <IconItemForm action={saveCoreValue} submitLabel="Create value" />
      </div>
    </>
  );
}
