import { redirect } from "next/navigation";
import { ApiForm } from "@/components/admin/ApiForm";
import { Card, EmptyState, Field, PageHeader, formatAdminDate } from "@/components/admin/AdminUI";
import { getSessionUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export default async function UsersPage() {
  const user = await getSessionUser();
  if (!user || user.role !== "SUPER_ADMIN") redirect("/admin");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });

  return (
    <>
      <PageHeader
        title="Users"
        description="Create and activate or deactivate Content Editor accounts. Super Admin privileges cannot be granted here."
      />
      <Card className="mb-6">
        <details>
          <summary className="cursor-pointer font-bold text-navy-950">Create Content Editor</summary>
          <ApiForm
            action="/api/admin/users"
            method="POST"
            submitLabel="Create editor"
            successMessage="Content Editor created."
            resetOnSuccess
            className="mt-5 space-y-5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" name="name" required maxLength={200} />
              <Field label="Email" name="email" type="email" required maxLength={255} />
            </div>
            <Field label="Temporary password" name="password" type="password" required maxLength={200} />
            <p className="text-xs text-slate-500">
              At least 12 characters with uppercase, lowercase, number, and special character.
            </p>
          </ApiForm>
        </details>
      </Card>
      <Card className="overflow-hidden p-0 sm:p-0">
        {users.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Last sign-in</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-slate-500">{item.email}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-600">{item.role.replace("_", " ")}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {formatAdminDate(item.lastLoginAt)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          item.isActive ? "bg-teal-50 text-teal-800" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {item.role === "CONTENT_EDITOR" ? (
                        <ApiForm
                          action="/api/admin/users"
                          submitLabel={item.isActive ? "Deactivate" : "Activate"}
                          danger={item.isActive}
                          confirmMessage={
                            item.isActive
                              ? `Deactivate ${item.name} and end their sessions?`
                              : undefined
                          }
                          successMessage="User status updated."
                          className="inline-block"
                        >
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="isActive" value={String(!item.isActive)} />
                        </ApiForm>
                      ) : (
                        <span className="text-xs text-slate-400">Protected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState>No users found.</EmptyState>
        )}
      </Card>
    </>
  );
}
