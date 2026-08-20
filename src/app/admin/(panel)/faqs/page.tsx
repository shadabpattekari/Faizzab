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
import { PUBLISH_STATUSES } from "@/lib/admin/api";

export default async function FaqsPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return (
    <>
      <PageHeader title="FAQs" description="Create, order, publish, and update frequently asked questions." />
      <Card className="mb-6">
        <details>
          <summary className="cursor-pointer font-bold text-navy-950">Add FAQ</summary>
          <ApiForm
            action="/api/admin/faqs"
            method="POST"
            submitLabel="Create FAQ"
            successMessage="FAQ created."
            resetOnSuccess
            className="mt-5 space-y-5"
          >
            <Field label="Question" name="question" required maxLength={500} />
            <TextareaField label="Answer" name="answer" required rows={6} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Category" name="category" maxLength={100} />
              <Field label="Sort order" name="sortOrder" type="number" defaultValue={0} />
              <SelectField label="Publishing" name="publishStatus" defaultValue="PUBLISHED" options={PUBLISH_STATUSES} />
            </div>
          </ApiForm>
        </details>
      </Card>
      <div className="space-y-4">
        {faqs.length ? (
          faqs.map((faq) => (
            <Card key={faq.id}>
              <details>
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-bold text-navy-950">{faq.question}</span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                      {faq.publishStatus}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{faq.category || "General"} · Order {faq.sortOrder}</p>
                </summary>
                <div className="mt-5 space-y-5 border-t border-slate-100 pt-5">
                  <ApiForm action={`/api/admin/faqs/${faq.id}`} successMessage="FAQ saved.">
                    <Field label="Question" name="question" defaultValue={faq.question} required />
                    <TextareaField label="Answer" name="answer" defaultValue={faq.answer} required rows={6} />
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Field label="Category" name="category" defaultValue={faq.category} />
                      <Field label="Sort order" name="sortOrder" type="number" defaultValue={faq.sortOrder} />
                      <SelectField
                        label="Publishing"
                        name="publishStatus"
                        defaultValue={faq.publishStatus}
                        options={PUBLISH_STATUSES}
                      />
                    </div>
                  </ApiForm>
                  <div className="border-t border-slate-100 pt-4">
                    <ApiForm
                      action={`/api/admin/faqs/${faq.id}`}
                      method="DELETE"
                      submitLabel="Delete FAQ"
                      danger
                      confirmMessage="Permanently delete this FAQ?"
                      successMessage="FAQ deleted."
                      className=""
                    />
                  </div>
                </div>
              </details>
            </Card>
          ))
        ) : (
          <EmptyState>No FAQs have been created.</EmptyState>
        )}
      </div>
    </>
  );
}
