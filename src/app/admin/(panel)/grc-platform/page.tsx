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
import { PRODUCT_STATUSES } from "@/lib/admin/api";

export default async function GrcPlatformPage() {
  const platforms = await prisma.grcPlatformContent.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <PageHeader
        title="GRC Platform"
        description="Maintain the product direction, development status, planned features, and launch messaging."
      />
      <div className="space-y-5">
        {platforms.length ? (
          platforms.map((platform) => (
            <Card key={platform.id}>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-navy-950">{platform.title}</h2>
                <StatusBadge status={platform.status} />
              </div>
              <ApiForm action="/api/admin/grc-platform" successMessage="GRC Platform content saved.">
                <input type="hidden" name="id" value={platform.id} />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Title" name="title" defaultValue={platform.title} required />
                  <SelectField
                    label="Product status"
                    name="status"
                    defaultValue={platform.status}
                    options={PRODUCT_STATUSES}
                  />
                </div>
                <TextareaField label="Summary" name="summary" defaultValue={platform.summary} rows={4} />
                <TextareaField
                  label="Description"
                  name="description"
                  defaultValue={platform.description}
                  rows={9}
                />
                <TextareaField
                  label="Planned features"
                  name="features"
                  defaultValue={jsonToLines(platform.features)}
                  rows={8}
                  help="One item per line."
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="SEO title" name="seoTitle" defaultValue={platform.seoTitle} />
                  <TextareaField
                    label="SEO description"
                    name="seoDescription"
                    defaultValue={platform.seoDescription}
                    rows={3}
                  />
                </div>
              </ApiForm>
            </Card>
          ))
        ) : (
          <EmptyState>No GRC Platform record found. Run the database seed script first.</EmptyState>
        )}
      </div>
    </>
  );
}
