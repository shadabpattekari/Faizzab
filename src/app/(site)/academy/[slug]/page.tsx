import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { COMPANY } from "@/lib/company";
import { getPublishedCourseBySlug, getPublishedCourses } from "@/lib/content/loaders";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const courses = await getPublishedCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = await getPublishedCourseBySlug((await params).slug);
  if (!course) return {};

  return buildPageMetadata({
    path: `/academy/${course.slug}`,
    title: course.seoTitle || course.title,
    description: course.seoDescription || course.summary,
  });
}

export default async function AcademyCoursePage({ params }: PageProps) {
  const course = await getPublishedCourseBySlug((await params).slug);
  if (!course) notFound();

  const url = `${COMPANY.url}/academy/${course.slug}`;
  const outcomes = course.outcomes || [];
  const futureFeatures = course.futureFeatures || [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: COMPANY.url },
          { name: "Academy", item: `${COMPANY.url}/academy` },
          { name: course.title, item: url },
        ]}
      />
      <section className="hero-surface text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="[&_a]:text-slate-200 [&_span]:text-white">
            <Breadcrumbs
              items={[{ label: "Academy", href: "/academy" }, { label: course.title }]}
            />
          </div>
          <StatusBadge status={course.status} />
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{course.summary}</p>
          <ButtonLink href="/academy#launch-list" className="mt-8" size="lg">
            Join Launch List
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-navy-950">Course preview</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{course.description}</p>
          <h2 className="mt-10 font-display text-3xl font-bold text-navy-950">
            Planned learning outcomes
          </h2>
          <ul className="mt-6 space-y-3">
            {outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 leading-7 text-slate-600">
                <span className="font-bold text-teal-700" aria-hidden="true">
                  ✓
                </span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-navy-950">Intended audience</h2>
          <p className="mt-4 leading-7 text-slate-600">{course.audience}</p>
          <div className="mt-7 border-t border-slate-200 pt-6">
            <p className="font-semibold text-navy-950">Availability</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This course is coming soon. Registration, payment, course access and certificates
              are not currently available.
            </p>
          </div>
        </aside>
      </section>

      <section className="section-alt border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-950">Planned features</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {futureFeatures.map((feature) => (
              <span
                key={feature}
                className="rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-700"
              >
                {feature}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-500">
            Planned features may be revised before release and do not represent currently
            available functionality.
          </p>
          <ButtonLink href="/academy#launch-list" className="mt-7">
            Join Launch List
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
