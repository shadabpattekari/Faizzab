import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { INDUSTRIES } from "@/lib/company";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "FaizZab services are designed to support organizations across technology, financial services, healthcare, professional services, manufacturing and education.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs items={[{ label: "Industries" }]} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
            Industries
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            Governance and assurance support shaped around organizational context
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Sector, size, risk profile and stakeholder expectations all influence what practical
            implementation should look like.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">
          Designed to support organizations operating in environments such as:
        </h2>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, index) => (
            <article key={industry} className="rounded-xl border border-slate-200 bg-white p-6">
              <span className="text-sm font-bold text-teal-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-navy-950">{industry}</h3>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-4xl leading-7 text-slate-600">
          This list describes the types of operating environments the services are designed to
          support. It is not a statement of current or past customers, engagements or sector
          credentials.
        </p>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-950">
              Start with your operating reality.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Discuss your industry context, obligations, customer expectations and current
              governance priorities.
            </p>
          </div>
          <ButtonLink href="/contact">Request a Consultation</ButtonLink>
        </div>
      </section>
    </>
  );
}
