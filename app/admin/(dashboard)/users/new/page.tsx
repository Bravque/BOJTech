import { AdminHeader } from "@/app/admin/_components/ui";
import { UserForm } from "@/app/admin/_components/forms/UserForm";

export const dynamic = "force-dynamic";

export default function NewUserPage() {
  return (
    <>
      <AdminHeader title="New user" backHref="/admin/users" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <UserForm />
      </div>
    </>
  );
}
