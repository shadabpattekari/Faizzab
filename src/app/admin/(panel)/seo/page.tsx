import { ApiForm } from "@/components/admin/ApiForm";
import {
  Card,
  EmptyState,
  Field,
  PageHeader,
  SelectField,
  TextareaField,
} from "@/components/admin/AdminUI";
import { prisma } from "@/lib/db/prisma";

const INDEX_OPTIONS = [
  { value: "false", label: "Allow indexing" },
  { value: "true", label: "Noindex" },
] as const;

export default async function SeoPage() {
  const entries = await prisma.seoEntry.findMany({ orderBy: { path: "asc" } });
  return (
    <>
      <PageHeader title="SEO" description="Manage page titles, descriptions, social copy, and indexing directives." />
      <Card className="mb-6">
        <details>
          <summary className="cursor-pointer font-bold text-navy-950">Add SEO entry</summary>
          <ApiForm
            action="/api/admin/seo"
            method="POST"
            submitLabel="Create entry"
            successMessage="SEO entry created."
            resetOnSuccess
            className="mt-5 space-y-5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Page path" name="path" required placeholder="/services" />
              <SelectField label="Search indexing" name="noindex" defaultValue="false" options={INDEX_OPTIONS} />
            </div>
            <Field label="Title" name="title" required maxLength={200} />
            <TextareaField label="Description" name="description" required rows={3} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Open Graph title" name="ogTitle" maxLength={200} />
              <TextareaField label="Open Graph description" name="ogDescription" rows={3} />
            </div>
          </ApiForm>
        </details>
      </Card>
      <div className="space-y-4">
        {entries.length ? (
          entries.map((entry) => (
            <Card key={entry.id}>
              <details>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span>
                    <span className="block font-mono text-sm font-bold text-navy-950">{entry.path}</span>
                    <span className="block text-sm text-slate-500">{entry.title}</span>
                  </span>
                  {entry.noindex ? (
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">NOINDEX</span>
                  ) : null}
                </summary>
                <div className="mt-5 space-y-5 border-t border-slate-100 pt-5">
                  <ApiForm action={`/api/admin/seo/${entry.id}`} successMessage="SEO entry saved.">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Page path" name="path" defaultValue={entry.path} required />
                      <SelectField
                        label="Search indexing"
                        name="noindex"
                        defaultValue={entry.noindex}
                        options={INDEX_OPTIONS}
                      />
                    </div>
                    <Field label="Title" name="title" defaultValue={entry.title} required />
                    <TextareaField
                      label="Description"
                      name="description"
                      defaultValue={entry.description}
                      required
                      rows={3}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Open Graph title" name="ogTitle" defaultValue={entry.ogTitle} />
                      <TextareaField
                        label="Open Graph description"
                        name="ogDescription"
                        defaultValue={entry.ogDescription}
                        rows={3}
                      />
                    </div>
                  </ApiForm>
                  <div className="border-t border-slate-100 pt-4">
                    <ApiForm
                      action={`/api/admin/seo/${entry.id}`}
                      method="DELETE"
                      submitLabel="Delete entry"
                      danger
                      confirmMessage="Permanently delete this SEO entry?"
                      successMessage="SEO entry deleted."
                      className=""
                    />
                  </div>
                </div>
              </details>
            </Card>
          ))
        ) : (
          <EmptyState>No SEO entries have been created.</EmptyState>
        )}
      </div>
    </>
  );
}
