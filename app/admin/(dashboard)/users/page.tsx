import { prisma } from "@/lib/db";
import { AdminHeader, ListView } from "@/app/admin/_components/ui";
import { deleteUser } from "@/app/admin/_actions/users";

export const dynamic = "force-dynamic";

export default async function UsersListPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <AdminHeader
        title="Users"
        description="People who can sign in to this dashboard."
        action={{ href: "/admin/users/new", label: "New user" }}
      />
      <ListView
        deleteAction={deleteUser}
        rows={users.map((u) => ({
          id: u.id,
          title: u.name,
          subtitle: u.email,
          badge: u.role,
          editHref: `/admin/users/${u.id}`,
        }))}
      />
    </>
  );
}
