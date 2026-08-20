import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact FaizZab to discuss practical governance, risk, compliance and implementation support.",
  alternates: { canonical: "/contact" },
};

const contactFields = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Business Email", type: "email" as const, required: true },
  { name: "company", label: "Company (optional)" },
  { name: "telephone", label: "Telephone (optional)", type: "tel" as const },
  { name: "subject", label: "Subject", required: true },
  {
    name: "message",
    label: "Message",
    type: "textarea" as const,
    required: true,
    rows: 6,
  },
  {
    name: "privacyAccepted",
    label: "I acknowledge the Privacy Policy and agree that FaizZab may contact me about this enquiry.",
    type: "checkbox" as const,
    required: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs items={[{ label: "Contact" }]} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Talk to FaizZab
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Share the governance, risk, compliance or assurance priority you are working through.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-950">Company details</h2>
          <dl className="mt-7 space-y-6 text-sm">
            <div>
              <dt className="font-semibold text-navy-950">Legal name</dt>
              <dd className="mt-1 text-slate-600">{COMPANY.legalName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">CIN</dt>
              <dd className="mt-1 text-slate-600">{COMPANY.cin}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Email</dt>
              <dd className="mt-1">
                <a className="text-teal-700 hover:text-teal-800" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Phone</dt>
              <dd className="mt-1">
                <a
                  className="text-teal-700 hover:text-teal-800"
                  href={`tel:${COMPANY.telephone.replace(/\s/g, "")}`}
                >
                  {COMPANY.telephoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Registered office</dt>
              <dd className="mt-1 leading-6 text-slate-600">
                {COMPANY.registeredOffice.singleLine}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Queries / Grievances</dt>
              <dd className="mt-1 text-slate-600">{COMPANY.grievances}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Send an enquiry
          </h2>
          <p className="mt-3 mb-7 leading-7 text-slate-600">
            Provide enough context for us to route and respond to your request.
          </p>
          <LeadForm
            endpoint="/api/enquiries/contact"
            fields={contactFields}
            submitLabel="Send Enquiry"
            successMessage="Thank you. Your enquiry has been received."
            footer={
              <p className="text-xs leading-5 text-slate-500">
                See the{" "}
                <Link href="/privacy-policy" className="underline hover:text-teal-700">
                  Privacy Policy
                </Link>{" "}
                for how enquiry information is handled.
              </p>
            }
          />
        </div>
      </section>
    </>
  );
}
