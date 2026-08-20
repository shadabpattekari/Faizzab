import Link from "next/link";
import { ArrowRight, BookOpen, BriefcaseBusiness, Inbox, Users } from "lucide-react";
import { Card, PageHeader, formatAdminDate } from "@/components/admin/AdminUI";
import { prisma } from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  const [openEnquiries, publishedInsights, services, editors, recent] = await Promise.all([
    prisma.enquiry.count({ where: { status: { in: ["NEW", "CONTACTED", "QUALIFIED"] } } }),
    prisma.insight.count({ where: { publishStatus: "PUBLISHED" } }),
    prisma.service.count(),
    user?.role === "SUPER_ADMIN"
      ? prisma.user.count({ where: { role: "CONTENT_EDITOR", isActive: true } })
      : Promise.resolve(0),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        name: true,
        company: true,
        leadType: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const stats = [
    { label: "Open enquiries", value: openEnquiries, href: "/admin/enquiries", icon: Inbox },
    { label: "Published insights", value: publishedInsights, href: "/admin/insights", icon: BookOpen },
    { label: "Services", value: services, href: "/admin/services", icon: BriefcaseBusiness },
    ...(user?.role === "SUPER_ADMIN"
      ? [{ label: "Active editors", value: editors, href: "/admin/users", icon: Users }]
      : []),
  ];

  return (
    <>
      <PageHeader
        title={`Welcome, ${user?.name?.split(" ")[0] || "Admin"}`}
        description="Overview of enquiries, published content, and administration activity."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Link href={href} key={label}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-navy-950">{value}</p>
                </div>
                <span className="rounded-lg bg-teal-50 p-2.5 text-teal-700">
                  <Icon size={21} />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-7 overflow-hidden p-0 sm:p-0">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-navy-950">Recent enquiries</h2>
          <Link className="flex items-center gap-1 text-sm font-semibold text-teal-700" href="/admin/enquiries">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 sm:px-6">Contact</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td className="px-5 py-3.5 sm:px-6">
                    <p className="font-semibold text-slate-900">{enquiry.name}</p>
                    <p className="text-slate-500">{enquiry.company || "—"}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{enquiry.leadType.replaceAll("_", " ")}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-700">{enquiry.status.replaceAll("_", " ")}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-slate-500">
                    {formatAdminDate(enquiry.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
