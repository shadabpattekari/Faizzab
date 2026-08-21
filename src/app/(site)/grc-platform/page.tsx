import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getGrcPlatformContent } from "@/lib/content/loaders";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const platform = await getGrcPlatformContent();
  return buildPageMetadata({
    path: "/grc-platform",
    title: platform.seoTitle || platform.title,
    description: platform.seoDescription || platform.summary,
  });
}

const platformFields = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Work email", type: "email" as const, required: true },
  { name: "company", label: "Organization", required: true },
  { name: "jobTitle", label: "Job title" },
  {
    name: "organizationSize",
    label: "Organization size",
    type: "select" as const,
    options: [
      { value: "1-10", label: "1–10 people" },
      { value: "11-50", label: "11–50 people" },
      { value: "51-200", label: "51–200 people" },
      { value: "201-500", label: "201–500 people" },
      { value: "501+", label: "501+ people" },
    ],
  },
  {
    name: "areasOfInterest",
    label: "Areas of interest",
    type: "textarea" as const,
    required: true,
    rows: 4,
    placeholder: "For example: risk, controls, evidence, audit readiness, or reporting",
  },
  {
    name: "message",
    label: "Additional context",
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

export default async function GrcPlatformPage() {
  const platform = await getGrcPlatformContent();

  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs items={[{ label: "GRC Platform" }]} />
          </div>
          <StatusBadge status={platform.status} />
          <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">{platform.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{platform.summary}</p>
          <a
            href="#register-interest"
            className="mt-8 inline-flex rounded-md bg-teal-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            Register Interest
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Intended product direction
          </h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-600">
            {platform.description.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-navy-950">Current status</h2>
          <StatusBadge status={platform.status} className="mt-5" />
          <p className="mt-4 leading-7 text-slate-600">
            The platform is not available for use today. No production functionality, service
            level or release date is being represented on this page.
          </p>
        </aside>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Areas being considered
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platform.features.map((feature) => (
              <div key={feature} className="rounded-lg border border-slate-200 bg-white p-5">
                <p className="font-semibold text-navy-950">{feature}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-500">
            These items describe intended direction only and may change during development.
          </p>
        </div>
      </section>

      <section id="register-interest" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <StatusBadge status={platform.status} />
            <h2 className="mt-4 font-display text-3xl font-bold text-navy-950">
              Register Interest
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Tell us which GRC workflows matter to your organization and receive updates as
              development progresses.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm
              endpoint="/api/enquiries/grc-platform"
              fields={platformFields}
              submitLabel="Register Interest"
              successMessage="Thank you. Your interest in the FaizZab GRC Platform has been registered."
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
