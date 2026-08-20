"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  ClipboardList,
  FileQuestion,
  GraduationCap,
  Home,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import type { SessionUser } from "@/lib/auth/session";

const NAVIGATION = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Enquiries", href: "/admin/enquiries", icon: ClipboardList },
  { label: "Homepage", href: "/admin/homepage", icon: Home },
  { label: "Services", href: "/admin/services", icon: BriefcaseBusiness },
  { label: "Toolkits", href: "/admin/toolkits", icon: Wrench },
  { label: "Academy", href: "/admin/academy", icon: GraduationCap },
  { label: "GRC Platform", href: "/admin/grc-platform", icon: ShieldCheck },
  { label: "Insights", href: "/admin/insights", icon: BookOpen },
  { label: "FAQs", href: "/admin/faqs", icon: FileQuestion },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Users", href: "/admin/users", icon: Users, superOnly: true },
  { label: "Audit log", href: "/admin/audit-log", icon: ListChecks, superOnly: true },
  { label: "Change password", href: "/admin/change-password", icon: KeyRound },
] as const;

export function AdminShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const items = NAVIGATION.filter((item) => !("superOnly" in item) || user.role === "SUPER_ADMIN");

  async function logout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/admin/login");
    router.refresh();
  }

  const navigation = (
    <>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        {items.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon aria-hidden size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="mb-3 min-w-0">
          <p className="truncate text-sm font-semibold text-white">{user.name}</p>
          <p className="truncate text-xs text-slate-400">{user.email}</p>
          <p className="mt-1 text-[11px] font-bold tracking-wider text-teal-300">
            {user.role.replace("_", " ")}
          </p>
        </div>
        <form onSubmit={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut aria-hidden size={17} />
            Sign out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-navy-950 lg:flex">
        <Link href="/admin" className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <span className="grid size-10 place-items-center rounded-lg bg-teal-600 text-lg font-bold text-white">
            FZ
          </span>
          <span>
            <span className="block font-display text-xl font-bold text-white">FaizZab</span>
            <span className="block text-xs font-semibold tracking-widest text-teal-300">
              ADMIN PORTAL
            </span>
          </span>
        </Link>
        {navigation}
      </aside>

      <details className="group sticky top-0 z-40 border-b border-slate-200 bg-navy-950 lg:hidden">
        <summary className="flex h-16 cursor-pointer list-none items-center justify-between px-4 text-white">
          <span className="flex items-center gap-3 font-display text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-md bg-teal-600 text-sm">FZ</span>
            Admin Portal
          </span>
          <Menu aria-label="Open navigation" />
        </summary>
        <div className="flex max-h-[calc(100vh-4rem)] flex-col border-t border-white/10">{navigation}</div>
      </details>

      <main className="min-h-screen lg:pl-72">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
