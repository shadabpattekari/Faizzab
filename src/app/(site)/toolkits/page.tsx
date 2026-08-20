import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TOOLKIT_PRODUCT } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Toolkits",
  description:
    "Practical FaizZab governance, risk and compliance toolkits. The ISO 27001 GRC Starter Toolkit — Edition 2026 is coming soon.",
  alternates: { canonical: "/toolkits" },
};

export default function ToolkitsPage() {
  const ctaLabel =
    TOOLKIT_PRODUCT.status === "AVAILABLE_NOW"
      ? "Request to Purchase"
      : "Join Toolkit Launch List";

  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs items={[{ label: "Toolkits" }]} />
          </div>
          <StatusBadge status={TOOLKIT_PRODUCT.status} />
          <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
            Practical GRC toolkits
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Adaptable starter resources intended to help organizations structure foundational
            governance, risk, controls and evidence work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
          Featured toolkit
        </p>
        <article className="mt-5 grid gap-8 rounded-xl border border-slate-200 bg-white p-7 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <StatusBadge status={TOOLKIT_PRODUCT.status} />
            <h2 className="mt-5 font-display text-3xl font-bold text-navy-950">
              {TOOLKIT_PRODUCT.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {TOOLKIT_PRODUCT.subtitle}
            </p>
            <ButtonLink href={`/toolkits/${TOOLKIT_PRODUCT.slug}`} className="mt-7">
              {ctaLabel}
            </ButtonLink>
          </div>
          <div className="rounded-lg bg-navy-50 p-6">
            <h3 className="font-display text-xl font-bold text-navy-950">
              What the edition is planned to include
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {TOOLKIT_PRODUCT.contents.slice(0, 6).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-teal-700" aria-hidden="true">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-950">
            Release status
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            The toolkit is coming soon and is not currently available for purchase or download.
            Online payment is not offered in this phase. Join the launch list to receive release
            updates.
          </p>
        </div>
      </section>
    </>
  );
}
