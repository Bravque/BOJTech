"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Boxes,
  FolderGit2,
  Building2,
  Sparkles,
  BadgeCheck,
  BarChart3,
  Handshake,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SignOutButton } from "./SignOutButton";
import { cn } from "@/lib/utils";

const links: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/solutions", label: "Solutions", icon: Boxes },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderGit2 },
  { href: "/admin/industries", label: "Industries", icon: Building2 },
  { href: "/admin/values", label: "Core Values", icon: Sparkles },
  { href: "/admin/why-choose", label: "Why Choose Us", icon: BadgeCheck },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/clients", label: "Clients", icon: Handshake },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar({ user }: { user: { name?: string | null; email?: string | null; role?: string } }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="flex w-64 flex-none flex-col border-r border-white/10 bg-ink-950 p-4 text-white">
      <Link href="/admin" className="flex items-center gap-2 px-2 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold">
          B
        </span>
        <span className="font-display text-lg font-bold">BOJ Admin</span>
      </Link>

      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-brand-600 text-white"
                  : "text-brand-100/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-white/10 pt-4">
        <div className="px-3 pb-2">
          <p className="truncate text-sm font-medium text-white">{user.name}</p>
          <p className="truncate text-xs text-brand-100/50">{user.email}</p>
          {user.role && (
            <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-brand-100/70">
              {user.role}
            </span>
          )}
        </div>
        <Link
          href="/"
          target="_blank"
          className="block rounded-xl px-3 py-2 text-sm font-medium text-brand-100/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          View website ↗
        </Link>
        <SignOutButton />
      </div>
    </aside>
  );
}
