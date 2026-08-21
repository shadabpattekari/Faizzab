import type { Metadata } from "next";
import Link from "next/link";
import {
  BUSINESS_STATUS,
  CAPABILITY_AREAS,
  PRACTICAL_APPROACH,
  PRIMARY_HEADLINE,
} from "@/lib/company";
import {
  getGrcPlatformContent,
  getHomepageSectionMap,
  getLatestPublishedInsights,
  getPublishedCourses,
  getPublishedServices,
  getPublishedToolkit,
  sectionContentObject,
  toolkitCtaLabel,
} from "@/lib/content/loaders";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/",
    title: "Practical GRC Consulting and Implementation",
    description:
      "Practical governance, risk, compliance, information security, privacy, AI governance and audit-readiness support from FaizZab.",
  });
}

export default async function HomePage() {
  const [sections, services, courses, toolkit, grc, insights] = await Promise.all([
    getHomepageSectionMap(),
    getPublishedServices(),
    getPublishedCourses(),
    getPublishedToolkit(),
    getGrcPlatformContent(),
    getLatestPublishedInsights(3),
  ]);

  const hero = sectionContentObject(sections.hero);
  const capabilities = sectionContentObject(sections.capabilities);
  const approach = sectionContentObject(sections.approach);

  const headline =
    (typeof hero.headline === "string" && hero.headline) ||
    sections.hero?.title ||
    PRIMARY_HEADLINE;
  const eyebrow =
    (typeof hero.eyebrow === "string" && hero.eyebrow) || "Practical GRC implementation";
  const supporting =
    (typeof hero.supporting === "string" && hero.supporting) ||
    "FaizZab helps organizations turn governance and compliance expectations into clear priorities, workable controls, useful documentation and implementation evidence.";
  const primaryCta =
    hero.primaryCta && typeof hero.primaryCta === "object"
      ? (hero.primaryCta as { label?: string; href?: string })
      : { label: "Request a Consultation", href: "/contact?topic=consultation" };

  const capabilityItems =
    Array.isArray(capabilities.items) && capabilities.items.length
      ? (capabilities.items as { label: string; href: string }[])
      : [...CAPABILITY_AREAS];

  const approachSteps =
    Array.isArray(approach.steps) && approach.steps.length
      ? (approach.steps as string[])
      : [...PRACTICAL_APPROACH];

  const readiness =
    services.find((service) => service.isFeatured) ||
    services.find((service) => service.slug === "iso-27001-grc-readiness-assessment") ||
    services[0];

  const pillars = [
    {
      title: "Consulting",
      description:
        "Implementation-focused advisory across governance, risk, compliance, information security, privacy and assurance.",
      status: BUSINESS_STATUS.consulting.key,
      cta: "Request a Consultation",
      href: "/contact?topic=consultation",
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
        grc.summary ||
        "A future platform direction for governance, risk, controls, compliance evidence and audit-readiness workflows.",
      status: grc.status,
      cta: "Register Interest",
      href: "/grc-platform",
    },
  ] as const;

  const toolkitCta = toolkitCtaLabel(toolkit.status);

  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-4xl">
            <p className="fade-up text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
              {eyebrow}
            </p>
            <h1 className="fade-up-delay mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="fade-up-delay-2 mt-7 max-w-2xl text-lg leading-8 text-slate-200">
              {supporting}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={primaryCta.href || "/contact"} size="lg">
                {primaryCta.label || "Request a Consultation"}
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="secondary"
                size="lg"
                className="border-white/30 bg-white/10 text-white ring-white/40 hover:bg-white/20"
              >
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

      {readiness ? (
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
                  {readiness.ctaLabel || "Request a Readiness Assessment"}
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
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-950">
          {sections.capabilities?.title || "Capability areas"}
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Focused support for governance and assurance priorities that need to work in practice.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityItems.map((area) => (
            <Link
              key={`${area.href}-${area.label}`}
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
            {sections.approach?.title || "A clear path from intent to evidence"}
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {approachSteps.map((step, index) => (
              <li key={`${step}-${index}`} className="rounded-lg border border-white/15 bg-white/5 p-4">
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
            <StatusBadge status={toolkit.status} />
            <h2 className="mt-5 font-display text-2xl font-bold text-navy-950">
              {toolkit.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{toolkit.subtitle}</p>
            <ButtonLink href={`/toolkits/${toolkit.slug}`} className="mt-6">
              {toolkitCta}
            </ButtonLink>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-7">
            <StatusBadge status={BUSINESS_STATUS.academy.key} />
            <h2 className="mt-5 font-display text-2xl font-bold text-navy-950">
              FaizZab Academy preview
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              All {courses.length} planned courses are coming soon, with practical learning paths
              across AI governance, privacy, ISMS and GRC.
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
        {insights.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {insights.map((insight) => (
              <article
                key={insight.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                  {insight.category}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-navy-950">
                  <Link href={`/insights/${insight.slug}`} className="hover:text-teal-800">
                    {insight.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 leading-7 text-slate-600">{insight.excerpt}</p>
                {insight.publishedAt ? (
                  <p className="mt-4 text-sm text-slate-500">
                    {new Date(insight.publishedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                ) : null}
                <Link
                  href={`/insights/${insight.slug}`}
                  className="mt-4 font-semibold text-teal-700 hover:text-teal-800"
                >
                  Read insight <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-slate-600">Insights will appear here when published.</p>
            <Link
              href="/insights"
              className="mt-4 inline-flex font-semibold text-teal-700 hover:text-teal-800"
            >
              Visit Insights
            </Link>
          </div>
        )}
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
