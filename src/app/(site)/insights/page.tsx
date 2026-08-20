import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical FaizZab perspectives on governance, risk, compliance, information security, privacy and assurance.",
  alternates: { canonical: "/insights" },
};

async function getPublishedInsights() {
  try {
    return await prisma.insight.findMany({
      where: { publishStatus: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: {
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function InsightsPage() {
  const insights = await getPublishedInsights();

  return (
    <>
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs items={[{ label: "Insights" }]} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
            Insights
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Practical perspectives on governance and assurance
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Articles and implementation-oriented notes from FaizZab.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {insights.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-navy-950">
              Insights will appear here when published.
            </h2>
            <p className="mt-3 text-slate-600">
              Please check back for practical GRC and implementation perspectives.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <article
                key={insight.slug}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                  {insight.category}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-navy-950">
                  {insight.title}
                </h2>
                <p className="mt-3 flex-1 leading-7 text-slate-600">{insight.excerpt}</p>
                {insight.publishedAt ? (
                  <time
                    dateTime={insight.publishedAt.toISOString()}
                    className="mt-5 text-sm text-slate-500"
                  >
                    {new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(
                      insight.publishedAt,
                    )}
                  </time>
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
        )}
      </section>
    </>
  );
}
