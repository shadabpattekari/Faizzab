import { ApiForm } from "@/components/admin/ApiForm";
import {
  Card,
  EmptyState,
  Field,
  JsonTextarea,
  PageHeader,
  SelectField,
} from "@/components/admin/AdminUI";
import { prisma } from "@/lib/db/prisma";

const BOOLEAN_OPTIONS = [
  { value: "true", label: "Visible" },
  { value: "false", label: "Hidden" },
] as const;

export default async function HomepagePage() {
  const sections = await prisma.homepageSection.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <PageHeader
        title="Homepage"
        description="Control homepage section copy, structured content, order, and visibility."
      />
      <Card className="mb-6">
        <details>
          <summary className="cursor-pointer font-bold text-navy-950">Add homepage section</summary>
          <ApiForm
            action="/api/admin/homepage"
            method="POST"
            submitLabel="Create section"
            successMessage="Homepage section created."
            resetOnSuccess
            className="mt-5 space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Unique key" name="key" required maxLength={100} placeholder="customer-proof" />
              <Field label="Title" name="title" maxLength={300} />
              <Field label="Sort order" name="sortOrder" type="number" defaultValue={0} />
              <SelectField label="Visibility" name="isVisible" defaultValue="true" options={BOOLEAN_OPTIONS} />
            </div>
            <JsonTextarea label="Content" name="content" value={{ body: "" }} />
          </ApiForm>
        </details>
      </Card>
      <div className="space-y-5">
        {sections.length ? (
          sections.map((section) => (
            <Card key={section.id}>
              <div className="mb-5">
                <h2 className="text-lg font-bold text-navy-950">{section.title || section.key}</h2>
                <p className="font-mono text-xs text-slate-500">{section.key}</p>
              </div>
              <ApiForm action="/api/admin/homepage" successMessage="Homepage section saved.">
                <input type="hidden" name="id" value={section.id} />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Title" name="title" defaultValue={section.title} maxLength={300} />
                  <Field label="Sort order" name="sortOrder" type="number" defaultValue={section.sortOrder} />
                  <SelectField
                    label="Visibility"
                    name="isVisible"
                    defaultValue={section.isVisible}
                    options={BOOLEAN_OPTIONS}
                  />
                </div>
                <JsonTextarea label="Content" name="content" value={section.content} />
              </ApiForm>
            </Card>
          ))
        ) : (
          <EmptyState>No homepage sections have been seeded.</EmptyState>
        )}
      </div>
    </>
  );
}
