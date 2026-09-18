import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";
import { UserForm } from "@/app/admin/_components/forms/UserForm";

export const dynamic = "force-dynamic";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${user.name}`} backHref="/admin/users" />
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <UserForm record={{ id: user.id, name: user.name, email: user.email, role: user.role }} />
      </div>
    </>
  );
}
