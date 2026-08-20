import { redirect } from "next/navigation";
import { Card, EmptyState, PageHeader, formatAdminDate, inputClass, labelClass } from "@/components/admin/AdminUI";
import { getSessionUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export default async function AuditLogPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string }>;
}) {
  const user = await getSessionUser();
  if (!user || user.role !== "SUPER_ADMIN") redirect("/admin");
  const { action = "" } = await searchParams;
  const logs = await prisma.auditLog.findMany({
    where: action ? { action: { contains: action.slice(0, 128) } } : undefined,
    orderBy: { createdAt: "desc" },
    take: 250,
    select: {
      id: true,
      actorEmail: true,
      action: true,
      entityType: true,
      entityId: true,
      metadata: true,
      ipAddress: true,
      createdAt: true,
    },
  });

  return (
    <>
      <PageHeader
        title="Audit log"
        description="Read-only history of authentication, content, settings, and user-management activity."
      />
      <Card className="mb-6">
        <form method="get" className="flex flex-col items-end gap-3 sm:flex-row">
          <label className={`${labelClass} w-full max-w-md`}>
            Filter by action
            <input className={inputClass} name="action" defaultValue={action} placeholder="insight_updated" />
          </label>
          <button className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white">
            Filter
          </button>
        </form>
      </Card>
      <Card className="overflow-hidden p-0 sm:p-0">
        {logs.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Actor</th>
                  <th className="px-5 py-3">Action</th>
                  <th className="px-5 py-3">Entity</th>
                  <th className="px-5 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 align-top">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {formatAdminDate(log.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">{log.actorEmail || "System"}</p>
                      <p className="font-mono text-xs text-slate-400">{log.ipAddress || "—"}</p>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs font-bold text-navy-900">{log.action}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {log.entityType || "—"}
                      {log.entityId ? <span className="block font-mono text-xs text-slate-400">{log.entityId}</span> : null}
                    </td>
                    <td className="max-w-md px-5 py-4">
                      {log.metadata ? (
                        <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-slate-600">
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState>No audit records match this filter.</EmptyState>
        )}
      </Card>
    </>
  );
}
