import { ApiForm } from "@/components/admin/ApiForm";
import {
  Card,
  EmptyState,
  Field,
  PageHeader,
  SelectField,
  TextareaField,
  jsonToLines,
} from "@/components/admin/AdminUI";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { prisma } from "@/lib/db/prisma";
import { PRODUCT_STATUSES, PUBLISH_STATUSES } from "@/lib/admin/api";

export default async function ToolkitsPage() {
  const toolkits = await prisma.toolkitProduct.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <PageHeader
        title="Toolkits"
        description="Manage toolkit availability, included resources, licence copy, and release messaging."
      />
      <div className="space-y-5">
        {toolkits.length ? (
          toolkits.map((toolkit) => (
            <Card key={toolkit.id}>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-navy-950">{toolkit.title}</h2>
                  <p className="text-sm text-slate-500">{toolkit.slug}</p>
                </div>
                <StatusBadge status={toolkit.status} />
              </div>
              <ApiForm action="/api/admin/toolkits" successMessage="Toolkit saved.">
                <input type="hidden" name="id" value={toolkit.id} />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <Field label="Title" name="title" defaultValue={toolkit.title} required />
                  <Field label="Subtitle" name="subtitle" defaultValue={toolkit.subtitle} />
                  <SelectField label="Availability" name="status" defaultValue={toolkit.status} options={PRODUCT_STATUSES} />
                  <SelectField
                    label="Publishing"
                    name="publishStatus"
                    defaultValue={toolkit.publishStatus}
                    options={PUBLISH_STATUSES}
                  />
                </div>
                <TextareaField label="Description" name="description" defaultValue={toolkit.description} rows={8} />
                <TextareaField
                  label="Toolkit contents"
                  name="contents"
                  defaultValue={jsonToLines(toolkit.contents)}
                  rows={10}
                  help="One item per line."
                />
                <div className="grid gap-4 lg:grid-cols-2">
                  <TextareaField
                    label="Licence summary"
                    name="licenceSummary"
                    defaultValue={toolkit.licenceSummary}
                    rows={8}
                  />
                  <TextareaField
                    label="Disclaimer"
                    name="disclaimer"
                    defaultValue={toolkit.disclaimer}
                    rows={8}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="CTA label" name="ctaLabel" defaultValue={toolkit.ctaLabel} />
                  <Field label="SEO title" name="seoTitle" defaultValue={toolkit.seoTitle} />
                  <TextareaField
                    label="SEO description"
                    name="seoDescription"
                    defaultValue={toolkit.seoDescription}
                    rows={3}
                  />
                </div>
              </ApiForm>
            </Card>
          ))
        ) : (
          <EmptyState>No toolkit record found. Run the database seed script first.</EmptyState>
        )}
      </div>
    </>
  );
}
