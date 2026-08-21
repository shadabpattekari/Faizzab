import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { getPublishedServices } from "@/lib/content/loaders";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/services",
    title: "Services",
    description:
      "Practical FaizZab consulting across ISO, GRC, privacy, AI governance, SOC 2, PCI DSS, NIST CSF, audit and risk.",
  });
}

export default async function ServicesPage() {
  const orderedServices = await getPublishedServices();
  const featured = orderedServices.find((service) => service.isFeatured);

  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs items={[{ label: "Services" }]} />
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Services</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Practical consulting and implementation support designed to move organizations from
            compliance intent to operable controls and usable evidence.
          </p>
        </div>
      </section>

      {featured ? (
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <StatusBadge status={featured.status} />
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-teal-700">
                Featured packaged service
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy-950">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                {featured.shortDescription}
              </p>
              <ButtonLink href={`/services/${featured.slug}`} className="mt-7">
                {featured.ctaLabel || "Request a Readiness Assessment"}
              </ButtonLink>
            </div>
            <div className="rounded-xl bg-navy-950 p-7 text-white">
              <h3 className="font-display text-xl font-bold">What you receive</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
                {(featured.deliverables || []).slice(0, 5).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">All service areas</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {orderedServices.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6"
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
                View service <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
