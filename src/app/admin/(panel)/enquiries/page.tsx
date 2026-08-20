import type { LeadStatus, LeadType, Prisma } from "@prisma/client";
import { ApiForm } from "@/components/admin/ApiForm";
import {
  Card,
  EmptyState,
  PageHeader,
  SelectField,
  TextareaField,
  formatAdminDate,
  inputClass,
  labelClass,
} from "@/components/admin/AdminUI";
import { prisma } from "@/lib/db/prisma";
import { LEAD_STATUSES } from "@/lib/admin/api";

const LEAD_TYPES = [
  "GENERAL",
  "CONSULTATION",
  "READINESS_ASSESSMENT",
  "TOOLKIT",
  "ACADEMY",
  "GRC_PLATFORM",
] as const;

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  const filters = await searchParams;
  const where: Prisma.EnquiryWhereInput = {};
  if (LEAD_STATUSES.includes(filters.status as LeadStatus)) where.status = filters.status as LeadStatus;
  if (LEAD_TYPES.includes(filters.type as LeadType)) where.leadType = filters.type as LeadType;

  const enquiries = await prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <>
      <PageHeader
        title="Enquiries"
        description="Review incoming leads, update their progression status, and keep internal notes."
      />
      <Card className="mb-6">
        <form method="get" className="grid items-end gap-4 sm:grid-cols-3">
          <label className={labelClass}>
            Status
            <select className={inputClass} name="status" defaultValue={filters.status || ""}>
              <option value="">All statuses</option>
              {LEAD_STATUSES.map((status) => (
                <option key={status} value={status}>{status.replaceAll("_", " ")}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Enquiry type
            <select className={inputClass} name="type" defaultValue={filters.type || ""}>
              <option value="">All types</option>
              {LEAD_TYPES.map((type) => (
                <option key={type} value={type}>{type.replaceAll("_", " ")}</option>
              ))}
            </select>
          </label>
          <button className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
            Apply filters
          </button>
        </form>
      </Card>

      <div className="space-y-5">
        {enquiries.length ? (
          enquiries.map((enquiry) => (
            <Card key={enquiry.id}>
              <div className="mb-5 flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row">
                <div>
                  <h2 className="text-lg font-bold text-navy-950">{enquiry.name}</h2>
                  <p className="text-sm text-slate-500">
                    {enquiry.company || "No company"} · {enquiry.leadType.replaceAll("_", " ")}
                  </p>
                </div>
                <p className="text-sm text-slate-500">{formatAdminDate(enquiry.createdAt)}</p>
              </div>
              <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
                <dl className="grid content-start gap-3 text-sm sm:grid-cols-2">
                  <Detail label="Email">
                    <a className="text-teal-700 hover:underline" href={`mailto:${enquiry.email}`}>
                      {enquiry.email}
                    </a>
                  </Detail>
                  <Detail label="Telephone">{enquiry.telephone || "—"}</Detail>
                  <Detail label="Job title">{enquiry.jobTitle || "—"}</Detail>
                  <Detail label="Country">{enquiry.country || "—"}</Detail>
                  <Detail label="Subject">{enquiry.subject || "—"}</Detail>
                  <Detail label="Course interest">{enquiry.courseInterest || "—"}</Detail>
                  <Detail label="Message" full>
                    {enquiry.message || enquiry.reason || enquiry.areasOfInterest || "—"}
                  </Detail>
                </dl>
                <ApiForm action={`/api/admin/enquiries/${enquiry.id}`} successMessage="Enquiry updated.">
                  <SelectField
                    label="Status"
                    name="status"
                    defaultValue={enquiry.status}
                    options={LEAD_STATUSES}
                  />
                  <TextareaField
                    label="Internal notes"
                    name="adminNotes"
                    defaultValue={enquiry.adminNotes}
                    rows={5}
                  />
                </ApiForm>
              </div>
            </Card>
          ))
        ) : (
          <EmptyState>No enquiries match these filters.</EmptyState>
        )}
      </div>
    </>
  );
}

function Detail({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="mt-0.5 whitespace-pre-wrap text-slate-800">{children}</dd>
    </div>
  );
}
