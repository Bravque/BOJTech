import Link from "next/link";
import {
  Wrench,
  Boxes,
  FolderGit2,
  Building2,
  Sparkles,
  BadgeCheck,
  BarChart3,
  Handshake,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { prisma } from "@/lib/db";
import { AdminHeader } from "@/app/admin/_components/ui";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [services, solutions, projects, industries, values, whyChoose, stats, clients, users] =
    await Promise.all([
      prisma.service.count(),
      prisma.solution.count(),
      prisma.project.count(),
      prisma.industry.count(),
      prisma.coreValue.count(),
      prisma.whyChoose.count(),
      prisma.stat.count(),
      prisma.client.count(),
      prisma.user.count(),
    ]);

  const cards: { href: string; label: string; count: number; icon: LucideIcon }[] = [
    { href: "/admin/services", label: "Services", count: services, icon: Wrench },
    { href: "/admin/solutions", label: "Solutions", count: solutions, icon: Boxes },
    { href: "/admin/portfolio", label: "Portfolio projects", count: projects, icon: FolderGit2 },
    { href: "/admin/industries", label: "Industries", count: industries, icon: Building2 },
    { href: "/admin/values", label: "Core values", count: values, icon: Sparkles },
    { href: "/admin/why-choose", label: "Why-choose points", count: whyChoose, icon: BadgeCheck },
    { href: "/admin/stats", label: "Stats", count: stats, icon: BarChart3 },
    { href: "/admin/clients", label: "Clients", count: clients, icon: Handshake },
    { href: "/admin/users", label: "Users", count: users, icon: Users },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" description="Manage all BOJ Technologies website content." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-ink-900">{c.count}</p>
                <p className="text-sm text-ink-500">{c.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-ink-900">Site settings</h2>
        <p className="mt-1 text-sm text-ink-500">
          Update company details, contact information, business hours and social links.
        </p>
        <Link
          href="/admin/settings"
          className="mt-4 inline-flex h-10 items-center rounded-full bg-ink-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
        >
          Edit site settings
        </Link>
      </div>
    </>
  );
}
