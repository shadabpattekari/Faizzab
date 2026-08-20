import Link from "next/link";
import { ApiForm } from "@/components/admin/ApiForm";
import { Card, EmptyState, PageHeader, formatAdminDate } from "@/components/admin/AdminUI";
import { ButtonLink } from "@/components/ui/Button";
import { prisma } from "@/lib/db/prisma";

export default async function InsightsPage() {
  const insights = await prisma.insight.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <>
      <PageHeader
        title="Insights"
        description="Create articles, keep drafts private, and publish or unpublish existing content."
        action={<ButtonLink href="/admin/insights/new">New insight</ButtonLink>}
      />
      <div className="space-y-4">
        {insights.length ? (
          insights.map((insight) => (
            <Card key={insight.id}>
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        insight.publishStatus === "PUBLISHED"
                          ? "bg-teal-50 text-teal-800"
                          : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      {insight.publishStatus}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{insight.category}</span>
                  </div>
                  <Link href={`/admin/insights/${insight.id}/edit`} className="text-lg font-bold text-navy-950 hover:text-teal-700">
                    {insight.title}
                  </Link>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{insight.excerpt}</p>
                  <p className="mt-2 text-xs text-slate-500">Updated {formatAdminDate(insight.updatedAt)}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <ButtonLink href={`/admin/insights/${insight.id}/edit`} variant="secondary" size="sm">
                    Edit
                  </ButtonLink>
                  <ApiForm
                    action={`/api/admin/insights/${insight.id}`}
                    submitLabel={insight.publishStatus === "PUBLISHED" ? "Unpublish" : "Publish"}
                    successMessage="Publishing status updated."
                    className=""
                  >
                    <input
                      type="hidden"
                      name="publishStatus"
                      value={insight.publishStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED"}
                    />
                  </ApiForm>
                  <ApiForm
                    action={`/api/admin/insights/${insight.id}`}
                    method="DELETE"
                    submitLabel="Delete"
                    danger
                    confirmMessage="Permanently delete this insight?"
                    successMessage="Insight deleted."
                    className=""
                  />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <EmptyState>No insights yet. Create the first article.</EmptyState>
        )}
      </div>
    </>
  );
}
