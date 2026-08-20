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

const BOOLEAN_OPTIONS = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
] as const;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <PageHeader
        title="Services"
        description="Edit service positioning, availability, calls to action, delivery details, and search metadata."
      />
      <div className="space-y-4">
        {services.length ? (
          services.map((service) => (
            <Card key={service.id}>
              <details>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span>
                    <span className="block text-lg font-bold text-navy-950">{service.title}</span>
                    <span className="block text-sm text-slate-500">/{service.slug}</span>
                  </span>
                  <StatusBadge status={service.status} />
                </summary>
                <ApiForm
                  action={`/api/admin/services/${service.id}`}
                  successMessage="Service saved."
                  className="mt-6 space-y-5 border-t border-slate-100 pt-6"
                >
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Title" name="title" defaultValue={service.title} required />
                    <SelectField label="Availability" name="status" defaultValue={service.status} options={PRODUCT_STATUSES} />
                    <SelectField
                      label="Publishing"
                      name="publishStatus"
                      defaultValue={service.publishStatus}
                      options={PUBLISH_STATUSES}
                    />
                    <SelectField
                      label="Featured"
                      name="isFeatured"
                      defaultValue={service.isFeatured}
                      options={BOOLEAN_OPTIONS}
                    />
                    <Field label="Sort order" name="sortOrder" type="number" defaultValue={service.sortOrder} />
                    <Field label="CTA label" name="ctaLabel" defaultValue={service.ctaLabel} />
                    <Field label="CTA link" name="ctaHref" defaultValue={service.ctaHref} />
                  </div>
                  <TextareaField
                    label="Short description"
                    name="shortDescription"
                    defaultValue={service.shortDescription}
                    rows={3}
                    required
                  />
                  <TextareaField
                    label="Long description"
                    name="longDescription"
                    defaultValue={service.longDescription}
                    rows={8}
                    required
                  />
                  <div className="grid gap-4 lg:grid-cols-3">
                    <TextareaField
                      label="Methodology"
                      name="methodology"
                      defaultValue={jsonToLines(service.methodology)}
                      help="One item per line."
                    />
                    <TextareaField
                      label="Deliverables"
                      name="deliverables"
                      defaultValue={jsonToLines(service.deliverables)}
                      help="One item per line."
                    />
                    <TextareaField
                      label="Coverage areas"
                      name="coverageAreas"
                      defaultValue={jsonToLines(service.coverageAreas)}
                      help="One item per line."
                    />
                  </div>
                  <TextareaField label="Disclaimer" name="disclaimer" defaultValue={service.disclaimer} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="SEO title" name="seoTitle" defaultValue={service.seoTitle} />
                    <TextareaField
                      label="SEO description"
                      name="seoDescription"
                      defaultValue={service.seoDescription}
                      rows={3}
                    />
                  </div>
                </ApiForm>
              </details>
            </Card>
          ))
        ) : (
          <EmptyState>No services found. Run the database seed script first.</EmptyState>
        )}
      </div>
    </>
  );
}
