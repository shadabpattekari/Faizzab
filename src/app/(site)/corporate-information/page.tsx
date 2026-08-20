import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Corporate Information",
  description: "Corporate and contact information for FAIZZAB INTEGRITY PRIVATE LIMITED.",
  alternates: { canonical: "/corporate-information" },
};

export default function CorporateInformationPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Corporate Information" }]} />
      <h1 className="font-display text-4xl font-bold text-navy-950">
        Corporate Information
      </h1>
      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Legal review required:</strong> This page is a working website disclosure and
        should be reviewed by qualified legal counsel.
      </div>

      <div className="prose-legal mt-10">
        <h2>Company</h2>
        <dl className="space-y-5">
          <div>
            <dt className="font-semibold text-navy-950">Legal name</dt>
            <dd className="mt-1 text-slate-600">{COMPANY.legalName}</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy-950">Brand</dt>
            <dd className="mt-1 text-slate-600">{COMPANY.brand}</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy-950">Corporate Identity Number (CIN)</dt>
            <dd className="mt-1 text-slate-600">{COMPANY.cin}</dd>
          </div>
        </dl>

        <h2>Registered office</h2>
        <p>{COMPANY.registeredOffice.singleLine}</p>

        <h2>Contact</h2>
        <ul>
          <li>
            Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </li>
          <li>
            Phone:{" "}
            <a href={`tel:${COMPANY.telephone.replace(/\s/g, "")}`}>
              {COMPANY.telephoneDisplay}
            </a>
          </li>
          <li>Queries / Grievances: {COMPANY.grievances}</li>
        </ul>

        <h2>Website</h2>
        <p>
          <a href={COMPANY.url}>{COMPANY.url}</a>
        </p>
      </div>
    </section>
  );
}
