import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/company";
import { prisma } from "@/lib/db/prisma";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPublishedInsight(slug: string) {
  try {
    return await prisma.insight.findFirst({
      where: { slug, publishStatus: "PUBLISHED" },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getPublishedInsight(slug);

  if (!insight) {
    return {
      title: "Insights",
      robots: { index: false, follow: true },
    };
  }

  return buildPageMetadata({
    path: `/insights/${insight.slug}`,
    title: insight.seoTitle || insight.title,
    description: insight.seoDescription || insight.excerpt,
  });
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getPublishedInsight(slug);

  if (!insight) {
    return (
      <>
        <section className="hero-surface text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="[&_a]:text-slate-200 [&_span]:text-white">
              <Breadcrumbs items={[{ label: "Insights", href: "/insights" }]} />
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">Insights</h1>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-navy-950">
              Insights will appear here when published.
            </h2>
            <Link
              href="/insights"
              className="mt-5 inline-flex font-semibold text-teal-700 hover:text-teal-800"
            >
              Return to Insights
            </Link>
          </div>
        </section>
      </>
    );
  }

  const url = `${COMPANY.url}/insights/${insight.slug}`;
  const description = insight.seoDescription || insight.excerpt;

  return (
    <>
      <ArticleJsonLd
        title={insight.title}
        description={description}
        url={url}
        datePublished={insight.publishedAt?.toISOString()}
        dateModified={insight.updatedAt.toISOString()}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: COMPANY.url },
          { name: "Insights", item: `${COMPANY.url}/insights` },
          { name: insight.title, item: url },
        ]}
      />
      <article>
        <header className="hero-surface text-white">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="[&_a]:text-slate-200 [&_span]:text-white">
              <Breadcrumbs
                items={[
                  { label: "Insights", href: "/insights" },
                  { label: insight.title },
                ]}
              />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
              {insight.category}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {insight.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">{insight.excerpt}</p>
            {insight.publishedAt ? (
              <time
                dateTime={insight.publishedAt.toISOString()}
                className="mt-6 block text-sm text-slate-300"
              >
                Published{" "}
                {new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(
                  insight.publishedAt,
                )}
              </time>
            ) : null}
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-6 text-lg leading-8 text-slate-700">
            {insight.content.split(/\n{2,}/).map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 24)}`} className="whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
