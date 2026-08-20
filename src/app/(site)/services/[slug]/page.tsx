import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { COMPANY } from "@/lib/company";
import { SERVICES, getServiceBySlug, type ServiceContent } from "@/lib/content/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const readinessFields = [
  { name: "name", label: "Full Name", required: true },
  { name: "email", label: "Business Email", type: "email" as const, required: true },
  { name: "company", label: "Company", required: true },
  { name: "jobTitle", label: "Job Title", required: true },
  { name: "telephone", label: "Telephone (optional)", type: "tel" as const },
  { name: "country", label: "Country", required: true },
  { name: "industry", label: "Industry", required: true },
  {
    name: "organizationSize",
    label: "Organization Size",
    type: "select" as const,
    required: true,
    options: [
      { value: "1-10", label: "1–10 people" },
      { value: "11-50", label: "11–50 people" },
      { value: "51-200", label: "51–200 people" },
      { value: "201-500", label: "201–500 people" },
      { value: "501+", label: "501+ people" },
    ],
  },
  {
    name: "currentStatus",
    label: "Current ISO/GRC Status",
    required: true,
    placeholder: "For example: starting, partially implemented, or preparing for assurance",
  },
  {
    name: "reason",
    label: "Reason for Assessment",
    type: "textarea" as const,
    required: true,
    rows: 4,
  },
  {
    name: "targetTimeframe",
    label: "Target Timeframe",
    type: "select" as const,
    required: true,
    options: [
      { value: "within-30-days", label: "Within 30 days" },
      { value: "1-3-months", label: "1–3 months" },
      { value: "3-6-months", label: "3–6 months" },
      { value: "exploring", label: "Exploring options" },
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea" as const,
    rows: 4,
  },
  {
    name: "privacyAccepted",
    label: "I acknowledge the Privacy Policy and agree that FaizZab may contact me about this request.",
    type: "checkbox" as const,
    required: true,
  },
];

function ReadinessAssessmentPage({ service }: { service: ServiceContent }) {
  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs
              items={[{ label: "Services", href: "/services" }, { label: service.title }]}
            />
          </div>
          <StatusBadge status={service.status} />
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            {service.shortDescription}
          </p>
          <ButtonLink href="#request-assessment" className="mt-8" size="lg">
            Request a Readiness Assessment
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Understand your current position and practical next steps
          </h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-600">
            {service.longDescription.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Engagement overview
          </h2>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="font-semibold text-navy-950">Pricing</dt>
              <dd className="mt-1 leading-7 text-slate-600">
                Fixed-fee proposal following a short scoping discussion.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Timing</dt>
              <dd className="mt-1 leading-7 text-slate-600">
                Typical assessment delivery is approximately 5–10 business days from confirmed
                scope and timely access to agreed documents and stakeholders.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Format</dt>
              <dd className="mt-1 leading-7 text-slate-600">
                Structured review, stakeholder discussions, analysis and management readout.
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-950">Methodology</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {service.methodology?.map((step, index) => (
              <li key={step} className="rounded-lg border border-slate-200 bg-white p-5">
                <span className="text-sm font-bold text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-semibold text-navy-950">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-950">Deliverables</h2>
          <ul className="mt-7 space-y-3">
            {service.deliverables?.map((item) => (
              <li key={item} className="flex gap-3 leading-7 text-slate-600">
                <span className="font-bold text-teal-700" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-950">Coverage</h2>
          <div className="mt-7 flex flex-wrap gap-2">
            {service.coverageAreas?.map((area) => (
              <span
                key={area}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="font-semibold text-amber-950">Important scope disclaimer</h2>
          <p className="mt-2 max-w-5xl leading-7 text-amber-900">{service.disclaimer}</p>
        </div>
      </section>

      <section id="request-assessment" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              Available now
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-950">
              Request a Readiness Assessment
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Share your current context. FaizZab will review the request and contact you to
              confirm fit and scope.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm
              endpoint="/api/enquiries/readiness"
              fields={readinessFields}
              submitLabel="Request a Readiness Assessment"
              successMessage="Thank you. Your readiness assessment request has been received."
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
        </div>
      </section>
    </>
  );
}

function StandardServicePage({ service }: { service: ServiceContent }) {
  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs
              items={[{ label: "Services", href: "/services" }, { label: service.title }]}
            />
          </div>
          <StatusBadge status={service.status} />
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Practical support for your context
          </h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-600">
            {service.longDescription.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-xl bg-navy-950 p-7 text-white">
          <h2 className="font-display text-2xl font-bold">Discuss your priorities</h2>
          <p className="mt-4 leading-7 text-slate-200">
            A short conversation can clarify your objective, present state and a suitable scope
            for support.
          </p>
          <ButtonLink href="/contact?topic=consultation" className="mt-7">
            Request a Consultation
          </ButtonLink>
        </aside>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Implementation-oriented by design
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {[
              ["Clarify", "Define scope, responsibilities and the intended governance outcome."],
              ["Prioritize", "Sequence gaps and actions according to risk, value and feasibility."],
              ["Evidence", "Build operating routines and evidence that can be maintained over time."],
            ].map(([title, description]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="font-display text-xl font-bold text-navy-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default async function ServicePage({ params }: PageProps) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();

  const url = `${COMPANY.url}/services/${service.slug}`;
  const structuredData = (
    <>
      <ServiceJsonLd name={service.title} description={service.shortDescription} url={url} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: COMPANY.url },
          { name: "Services", item: `${COMPANY.url}/services` },
          { name: service.title, item: url },
        ]}
      />
    </>
  );

  return (
    <>
      {structuredData}
      {service.slug === "iso-27001-grc-readiness-assessment" ? (
        <ReadinessAssessmentPage service={service} />
      ) : (
        <StandardServicePage service={service} />
      )}
    </>
  );
}
