import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { COMPANY, PRACTICAL_APPROACH } from "@/lib/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about FaizZab and its practical, implementation-focused approach to governance, risk and compliance.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "About" }]} />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
            About FaizZab
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            Practical governance and assurance, built around implementation.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            FaizZab helps organizations translate governance, risk and compliance expectations
            into priorities, responsibilities, controls, documented information and evidence
            that teams can operate.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-950">Our purpose</h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-600">
            <p>
              Compliance programmes are most useful when they improve decisions, clarify
              accountability and create reliable evidence—not when they produce paperwork
              disconnected from daily work.
            </p>
            <p>
              Our advisory approach is designed to meet organizations where they are, identify
              what matters most and build a realistic sequence for implementation and continual
              improvement.
            </p>
            <p>
              Consulting services are available now. FaizZab Academy and the starter toolkit are
              coming soon, while the FaizZab GRC Platform remains in development.
            </p>
          </div>
        </div>
        <aside className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            Corporate identity
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy-950">{COMPANY.brand}</h2>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="font-semibold text-navy-950">Legal name</dt>
              <dd className="mt-1 text-slate-600">{COMPANY.legalName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Corporate Identity Number</dt>
              <dd className="mt-1 text-slate-600">{COMPANY.cin}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-950">Registered office</dt>
              <dd className="mt-1 leading-6 text-slate-600">
                {COMPANY.registeredOffice.singleLine}
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            How we work
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-950">
            A practical, evidence-oriented approach
          </h2>
          <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICAL_APPROACH.map((step, index) => (
              <li key={step} className="rounded-lg border border-slate-200 bg-white p-5">
                <span className="text-sm font-bold text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy-950">{step}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-navy-950 p-8 text-white sm:p-10">
          <h2 className="font-display text-3xl font-bold">
            Start with the governance or assurance priority in front of you.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-200">
            We can discuss your context, current maturity and the practical outcome you need.
          </p>
          <ButtonLink href="/contact" className="mt-7">
            Request a Consultation
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
