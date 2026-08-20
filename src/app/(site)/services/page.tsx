import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore FaizZab consulting services across ISO management systems, GRC, AI governance, privacy, cybersecurity, audit, risk and continuity.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const orderedServices = [...SERVICES].sort((a, b) => a.sortOrder - b.sortOrder);
  const featured = orderedServices.find((service) => service.isFeatured)!;
  const remaining = orderedServices.filter((service) => !service.isFeatured);

  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs items={[{ label: "Services" }]} />
          </div>
          <StatusBadge status="AVAILABLE_NOW" />
          <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
            Consulting for practical implementation and evidence
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            FaizZab supports organizations in building governance and assurance practices that
            are proportionate, operable and ready to demonstrate through useful evidence.
          </p>
          <ButtonLink href="/contact" className="mt-8" size="lg">
            Request a Consultation
          </ButtonLink>
        </div>
      </section>

      <section className="section-alt border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            Featured service
          </p>
          <div className="mt-5 grid gap-8 rounded-xl border border-teal-200 bg-white p-7 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <StatusBadge status={featured.status} />
              <h2 className="mt-5 font-display text-3xl font-bold text-navy-950">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                {featured.shortDescription}
              </p>
            </div>
            <ButtonLink href={`/services/${featured.slug}`}>
              Request a Readiness Assessment
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">
          Consulting capability areas
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Each engagement is scoped around the organization&apos;s context, priorities and
          intended outcome.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {remaining.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-teal-600"
            >
              <StatusBadge status={service.status} className="self-start" />
              <h3 className="mt-5 font-display text-2xl font-bold text-navy-950">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 leading-7 text-slate-600">{service.shortDescription}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-5 font-semibold text-teal-700 hover:text-teal-800"
              >
                Explore service <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
