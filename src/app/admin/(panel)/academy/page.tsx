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

export default async function AcademyPage() {
  const courses = await prisma.academyCourse.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <PageHeader
        title="Academy"
        description="Manage course status, audience, outcomes, roadmap features, and search copy."
      />
      <div className="space-y-4">
        {courses.length ? (
          courses.map((course) => (
            <Card key={course.id}>
              <details>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span>
                    <span className="block text-lg font-bold text-navy-950">{course.title}</span>
                    <span className="block text-sm text-slate-500">{course.slug}</span>
                  </span>
                  <StatusBadge status={course.status} />
                </summary>
                <ApiForm
                  action={`/api/admin/academy/${course.id}`}
                  successMessage="Course saved."
                  className="mt-6 space-y-5 border-t border-slate-100 pt-6"
                >
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Title" name="title" defaultValue={course.title} required />
                    <SelectField label="Availability" name="status" defaultValue={course.status} options={PRODUCT_STATUSES} />
                    <SelectField
                      label="Publishing"
                      name="publishStatus"
                      defaultValue={course.publishStatus}
                      options={PUBLISH_STATUSES}
                    />
                    <Field label="Sort order" name="sortOrder" type="number" defaultValue={course.sortOrder} />
                  </div>
                  <TextareaField label="Summary" name="summary" defaultValue={course.summary} rows={3} />
                  <TextareaField label="Description" name="description" defaultValue={course.description} rows={7} />
                  <TextareaField label="Audience" name="audience" defaultValue={course.audience} rows={3} />
                  <div className="grid gap-4 lg:grid-cols-2">
                    <TextareaField
                      label="Learning outcomes"
                      name="outcomes"
                      defaultValue={jsonToLines(course.outcomes)}
                      help="One item per line."
                    />
                    <TextareaField
                      label="Future features"
                      name="futureFeatures"
                      defaultValue={jsonToLines(course.futureFeatures)}
                      help="One item per line."
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="SEO title" name="seoTitle" defaultValue={course.seoTitle} />
                    <TextareaField
                      label="SEO description"
                      name="seoDescription"
                      defaultValue={course.seoDescription}
                      rows={3}
                    />
                  </div>
                </ApiForm>
              </details>
            </Card>
          ))
        ) : (
          <EmptyState>No Academy courses found. Run the database seed script first.</EmptyState>
        )}
      </div>
    </>
  );
}
