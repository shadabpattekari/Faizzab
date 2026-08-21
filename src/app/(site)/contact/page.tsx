import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqList } from "@/components/content/FaqList";
import { LeadForm } from "@/components/forms/LeadForm";
import { COMPANY } from "@/lib/company";
import {
  CONSULTATION_SERVICE_INTERESTS,
  interestLabelForSlug,
} from "@/lib/content/services";
import { getPublishedFaqs, getPublicSiteSettings } from "@/lib/content/loaders";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ topic?: string; interest?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/contact",
    title: "Contact",
    description:
      "Contact FaizZab to discuss practical governance, risk, compliance and implementation support.",
  });
}

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
    label:
      "I acknowledge the Privacy Policy and agree that FaizZab may contact me about this enquiry.",
    type: "checkbox" as const,
    required: true,
  },
];

function consultationFields(defaultInterest?: string) {
  const interestOptions: { value: string; label: string }[] =
    CONSULTATION_SERVICE_INTERESTS.map((item) => ({
      value: item.value,
      label: item.label,
    }));

  // Ensure a preselected interest from a service CTA is present even if labels differ slightly.
  if (defaultInterest && !interestOptions.some((o) => o.value === defaultInterest)) {
    interestOptions.unshift({ value: defaultInterest, label: defaultInterest });
  }

  return [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Business Email", type: "email" as const, required: true },
    { name: "company", label: "Company (optional)" },
    { name: "telephone", label: "Telephone (optional)", type: "tel" as const },
    {
      name: "serviceInterest",
      label: "Service interest",
      type: "select" as const,
      required: true,
      options: interestOptions,
      ...(defaultInterest ? { defaultValue: defaultInterest } : {}),
    },
    {
      name: "message",
      label: "Message",
      type: "textarea" as const,
      required: true,
      rows: 6,
      placeholder: "Share your current context, timeline and what you want to achieve.",
    },
    {
      name: "privacyAccepted",
      label:
        "I acknowledge the Privacy Policy and agree that FaizZab may contact me about this consultation request.",
      type: "checkbox" as const,
      required: true,
    },
  ];
}

export default async function ContactPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isConsultation = params.topic === "consultation";
  const defaultInterest = interestLabelForSlug(params.interest);

  const [{ contactInfo }, faqs] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedFaqs(),
  ]);
  const email = contactInfo.email || COMPANY.email;
  const telephone = contactInfo.telephone || COMPANY.telephone;

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
            {isConsultation ? "Request a Consultation" : "Talk to FaizZab"}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            {isConsultation
              ? "Tell us which service area matters most and enough context for a practical scoping conversation."
              : "Share the governance, risk, compliance or assurance priority you are working through."}
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
                <a className="text-teal-700 hover:text-teal-800" href={`mailto:${email}`}>
                  {email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Phone</dt>
              <dd className="mt-1">
                <a
                  className="text-teal-700 hover:text-teal-800"
                  href={`tel:${telephone.replace(/\s/g, "")}`}
                >
                  {telephone}
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
            {isConsultation ? "Consultation request" : "Send an enquiry"}
          </h2>
          <p className="mt-3 mb-7 leading-7 text-slate-600">
            {isConsultation
              ? "Select a service interest so we can route your request appropriately."
              : "Provide enough context for us to route and respond to your request."}
          </p>
          {isConsultation ? (
            <LeadForm
              endpoint="/api/enquiries/consultation"
              fields={consultationFields(defaultInterest)}
              submitLabel="Request a Consultation"
              successMessage="Thank you. Your consultation request has been received."
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
          ) : (
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
          )}
        </div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50">
        <FaqList faqs={faqs} />
      </div>
    </>
  );
}
