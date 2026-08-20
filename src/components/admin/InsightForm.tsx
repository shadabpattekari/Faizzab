import type { Insight } from "@prisma/client";
import { ApiForm } from "@/components/admin/ApiForm";
import { Field, SelectField, TextareaField } from "@/components/admin/AdminUI";
import { PUBLISH_STATUSES } from "@/lib/admin/api";

export function InsightForm({ insight }: { insight?: Insight }) {
  return (
    <ApiForm
      action={insight ? `/api/admin/insights/${insight.id}` : "/api/admin/insights"}
      method={insight ? "PATCH" : "POST"}
      submitLabel={insight ? "Save insight" : "Create insight"}
      successMessage={insight ? "Insight saved." : "Insight created."}
      redirectTo="/admin/insights"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={insight?.title} required maxLength={300} />
        <Field
          label="URL slug"
          name="slug"
          defaultValue={insight?.slug}
          required
          maxLength={200}
          placeholder="practical-grc-guide"
        />
        <Field label="Category" name="category" defaultValue={insight?.category} required maxLength={100} />
        <SelectField
          label="Publishing status"
          name="publishStatus"
          defaultValue={insight?.publishStatus ?? "DRAFT"}
          options={PUBLISH_STATUSES}
        />
      </div>
      <TextareaField label="Excerpt" name="excerpt" defaultValue={insight?.excerpt} rows={4} required />
      <TextareaField
        label="Article content"
        name="content"
        defaultValue={insight?.content}
        rows={18}
        required
        help="Plain text or Markdown content."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="SEO title" name="seoTitle" defaultValue={insight?.seoTitle} maxLength={200} />
        <TextareaField
          label="SEO description"
          name="seoDescription"
          defaultValue={insight?.seoDescription}
          rows={3}
        />
      </div>
    </ApiForm>
  );
}
