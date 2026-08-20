import type { Metadata } from "next";
import Link from "next/link";
import {
  BUSINESS_STATUS,
  CAPABILITY_AREAS,
  PRACTICAL_APPROACH,
  PRIMARY_HEADLINE,
} from "@/lib/company";
import { SERVICES } from "@/lib/content/services";
import { ACADEMY_COURSES, TOOLKIT_PRODUCT } from "@/lib/content/products";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const metadata: Metadata = {
  title: "Practical GRC Consulting and Implementation",
  description:
    "Practical governance, risk, compliance, information security, privacy, AI governance and audit-readiness support from FaizZab.",
  alternates: { canonical: "/" },
};

const pillars = [
  {
    title: "Consulting",
    description:
      "Implementation-focused advisory across governance, risk, compliance, information security, privacy and assurance.",
    status: BUSINESS_STATUS.consulting.key,
    cta: "Request a Consultation",
    href: "/services",
  },
  {
    title: "FaizZab Academy",
    description:
      "Planned practitioner learning designed around practical exercises, evidence habits and implementation scenarios.",
    status: BUSINESS_STATUS.academy.key,
    cta: "Join Launch List",
    href: "/academy",
  },
  {
    title: "GRC Platform",
    description:
      "A future platform direction for governance, risk, controls, compliance evidence and audit-readiness workflows.",
    status: BUSINESS_STATUS.grcPlatform.key,
    cta: "Register Interest",
    href: "/grc-platform",
  },
] as const;

export default function HomePage() {
  const readiness = SERVICES.find((service) => service.isFeatured)!;

  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-4xl">
            <p className="fade-up text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
              Practical GRC implementation
            </p>
            <h1 className="fade-up-delay mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {PRIMARY_HEADLINE}
            </h1>
            <p className="fade-up-delay-2 mt-7 max-w-2xl text-lg leading-8 text-slate-200">
              FaizZab helps organizations turn governance and compliance expectations into
              clear priorities, workable controls, useful documentation and implementation
              evidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg">
                Request a Consultation
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="lg">
                Explore Services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            One practical direction
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-950">
            Consulting today. Learning and technology built deliberately.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <StatusBadge status={pillar.status} />
              <h3 className="mt-5 font-display text-2xl font-bold text-navy-950">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="mt-5 inline-flex font-semibold text-teal-700 hover:text-teal-800"
              >
                {pillar.cta} <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <StatusBadge status={readiness.status} />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-teal-700">
              Featured service
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-950">
              {readiness.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {readiness.shortDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={`/services/${readiness.slug}`}>
                Request a Readiness Assessment
              </ButtonLink>
              <ButtonLink href={`/services/${readiness.slug}`} variant="secondary">
                View Assessment
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-xl bg-navy-950 p-7 text-white">
            <h3 className="font-display text-xl font-bold">Designed to create clarity</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
              {[
                "Current-state readiness view",
                "Prioritized findings",
                "Evidence and documentation priorities",
                "Practical 30/60/90-day roadmap",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-teal-200" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">Capability areas</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Focused support for governance and assurance priorities that need to work in practice.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITY_AREAS.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="rounded-lg border border-slate-200 bg-white px-5 py-4 font-semibold text-navy-900 transition hover:border-teal-600 hover:text-teal-700"
            >
              {area.label} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-200">
            Our practical approach
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">
            A clear path from intent to evidence
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {PRACTICAL_APPROACH.map((step, index) => (
              <li key={step} className="rounded-lg border border-white/15 bg-white/5 p-4">
                <span className="text-xs font-bold text-teal-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-semibold">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-alt border-b border-slate-200">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-xl border border-slate-200 bg-white p-7">
            <StatusBadge status={TOOLKIT_PRODUCT.status} />
            <h2 className="mt-5 font-display text-2xl font-bold text-navy-950">
              {TOOLKIT_PRODUCT.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{TOOLKIT_PRODUCT.subtitle}</p>
            <ButtonLink href={`/toolkits/${TOOLKIT_PRODUCT.slug}`} className="mt-6">
              Join Toolkit Launch List
            </ButtonLink>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-7">
            <StatusBadge status={BUSINESS_STATUS.academy.key} />
            <h2 className="mt-5 font-display text-2xl font-bold text-navy-950">
              FaizZab Academy preview
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              All {ACADEMY_COURSES.length} planned courses are coming soon, with practical
              learning paths across AI governance, privacy, ISMS and GRC.
            </p>
            <ButtonLink href="/academy" className="mt-6">
              Join Launch List
            </ButtonLink>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Insights</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-navy-950">
          Practical perspectives
        </h2>
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-slate-600">Insights will appear here when published.</p>
          <Link
            href="/insights"
            className="mt-4 inline-flex font-semibold text-teal-700 hover:text-teal-800"
          >
            Visit Insights
          </Link>
        </div>
      </section>

      <section className="bg-teal-700 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <h2 className="max-w-3xl font-display text-3xl font-bold">
            Build a practical path from compliance intent to implementation evidence.
          </h2>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Talk to FaizZab
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
