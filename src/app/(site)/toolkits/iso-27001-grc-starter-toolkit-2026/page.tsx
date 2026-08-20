import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { LeadForm } from "@/components/forms/LeadForm";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { COMPANY } from "@/lib/company";
import { TOOLKIT_PRODUCT } from "@/lib/content/products";

export const metadata: Metadata = {
  title: TOOLKIT_PRODUCT.seoTitle,
  description: TOOLKIT_PRODUCT.seoDescription,
  alternates: { canonical: `/toolkits/${TOOLKIT_PRODUCT.slug}` },
};

const toolkitFields = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email" as const, required: true },
  { name: "company", label: "Organization" },
  {
    name: "message",
    label: "What would you like to use the toolkit for?",
    type: "textarea" as const,
    rows: 4,
  },
  {
    name: "privacyAccepted",
    label: "I have read and accept the Privacy Policy.",
    type: "checkbox" as const,
    required: true,
  },
];

export default function ToolkitProductPage() {
  const ctaLabel =
    TOOLKIT_PRODUCT.status === "AVAILABLE_NOW"
      ? "Request to Purchase"
      : "Join Toolkit Launch List";
  const url = `${COMPANY.url}/toolkits/${TOOLKIT_PRODUCT.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: COMPANY.url },
          { name: "Toolkits", item: `${COMPANY.url}/toolkits` },
          { name: TOOLKIT_PRODUCT.title, item: url },
        ]}
      />
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs
              items={[
                { label: "Toolkits", href: "/toolkits" },
                { label: TOOLKIT_PRODUCT.title },
              ]}
            />
          </div>
          <StatusBadge status={TOOLKIT_PRODUCT.status} />
          <h1 className="mt-5 max-w-5xl font-display text-4xl font-bold sm:text-5xl">
            {TOOLKIT_PRODUCT.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            {TOOLKIT_PRODUCT.subtitle}
          </p>
          <a
            href="#toolkit-interest"
            className="mt-8 inline-flex rounded-md bg-teal-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            {ctaLabel}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">
          A practical starting point
        </h2>
        <div className="mt-5 max-w-4xl space-y-5 text-lg leading-8 text-slate-600">
          {TOOLKIT_PRODUCT.description.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Planned toolkit contents
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLKIT_PRODUCT.contents.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="flex gap-3 text-sm font-semibold leading-6 text-navy-950">
                  <span className="text-teal-700" aria-hidden="true">✓</span>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-xl border border-slate-200 bg-white p-7">
          <h2 className="font-display text-2xl font-bold text-navy-950">Licence summary</h2>
          <div className="mt-5 space-y-4 leading-7 text-slate-600">
            {TOOLKIT_PRODUCT.licenceSummary.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        <article className="rounded-xl border border-amber-200 bg-amber-50 p-7">
          <h2 className="font-display text-2xl font-bold text-amber-950">
            Important disclaimer
          </h2>
          <p className="mt-5 leading-7 text-amber-900">{TOOLKIT_PRODUCT.disclaimer}</p>
        </article>
      </section>

      <section className="border-y border-amber-200 bg-amber-50">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-amber-950">Legal review required</p>
          <p className="mt-1 text-sm leading-6 text-amber-900">
            Final licensing terms and legal disclaimer require qualified legal review before
            commercial release.
          </p>
        </div>
      </section>

      <section id="toolkit-interest" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <StatusBadge status={TOOLKIT_PRODUCT.status} />
            <h2 className="mt-4 font-display text-3xl font-bold text-navy-950">{ctaLabel}</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The toolkit is coming soon. Register your interest to receive release and guided
              purchase-process updates.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm
              endpoint="/api/enquiries/toolkit"
              fields={toolkitFields}
              submitLabel={ctaLabel}
              successMessage="Thank you. Your toolkit interest has been registered."
              footer={
                <p className="text-xs leading-5 text-slate-500">
                  See the{" "}
                  <Link href="/privacy-policy" className="underline hover:text-teal-700">
                    Privacy Policy
                  </Link>{" "}
                  for how your details are handled.
                </p>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
