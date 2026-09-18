import { AdminHeader } from "@/app/admin/_components/ui";
import { IconItemForm } from "@/app/admin/_components/forms/IconItemForm";
import { saveWhyChoose } from "@/app/admin/_actions/misc";

export const dynamic = "force-dynamic";

export default function NewWhyChoosePage() {
  return (
    <>
      <AdminHeader title="New why-choose point" backHref="/admin/why-choose" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <IconItemForm action={saveWhyChoose} submitLabel="Create point" />
      </div>
    </>
  );
}
